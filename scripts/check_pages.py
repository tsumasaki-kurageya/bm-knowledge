"""Validate generated local links and keep non-public documents out of Pages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re

SITE = Path(__file__).resolve().parents[1] / 'site'
SITE_URL = re.search(r'^site_url: (.+)$', (SITE.parent / 'mkdocs.yml').read_text(), re.MULTILINE)[1]
BASE_PATH = urlsplit(SITE_URL).path


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.links = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'a' and 'name' in attrs:
            self.ids.add(attrs['name'])
        if tag in ('a', 'link') and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag in ('script', 'img') and 'src' in attrs:
            self.links.append(attrs['src'])


def check():
    pages = {p.resolve(): Page(p.read_text(encoding='utf-8')) for p in SITE.rglob('*.html')}
    assert SITE.joinpath('index.html').resolve() in pages, 'Homepage missing'
    errors = []
    checked = 0
    for path, page in pages.items():
        for raw in page.links:
            link = urlsplit(raw)
            if link.scheme or link.netloc or raw in ('', '#'):
                continue
            if link.path.startswith(BASE_PATH):
                target = (SITE / unquote(link.path[len(BASE_PATH):])).resolve()
            else:
                target = (path.parent / unquote(link.path)).resolve() if link.path else path
            if target.is_dir():
                target = target / 'index.html'
            if not target.is_relative_to(SITE.resolve()) or not target.exists():
                errors.append(f'{path.relative_to(SITE)}: missing {raw}')
            elif link.fragment and target in pages and unquote(link.fragment) not in pages[target].ids:
                errors.append(f'{path.relative_to(SITE)}: missing anchor {raw}')
            checked += 1
    allowed = {'00-business', '01-domains', '02-processes'}
    for path in pages:
        relative = path.relative_to(SITE)
        if len(relative.parts) > 1 and relative.parts[0] not in allowed:
            errors.append(f'Unexpected document: {relative}')
    for path in SITE.rglob('*'):
        if any(part in ('03-evidence', '04-insights') for part in path.parts):
            errors.append(f'Non-public content: {path}')
    search = json.loads((SITE / 'search/search_index.json').read_text(encoding='utf-8'))
    for doc in search['docs']:
        location = doc['location'].split('#')[0]
        if location not in ('', 'index.html') and location.split('/')[0] not in allowed:
            errors.append(f'Unexpected search entry: {location}')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'Validated {len(pages)} HTML pages and {checked} local references; public scope checked.')


if __name__ == '__main__':
    check()
