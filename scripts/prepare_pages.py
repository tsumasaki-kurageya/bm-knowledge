"""Stage only the general knowledge Markdown; never copy the entire repository."""
from pathlib import Path
import re
import shutil
import yaml

ROOT = Path(__file__).resolve().parents[1]
STAGING = ROOT / '.pages-docs'
SECTIONS = (
    ('00-business', '全体像'),
    ('01-domains', '業務領域'),
    ('02-processes', '業務フロー'),
)


def prepare():
    if STAGING.is_symlink():
        raise ValueError('Staging directory must not be a symlink')
    if STAGING.exists():
        shutil.rmtree(STAGING)
    STAGING.mkdir()
    shutil.copyfile(ROOT / 'pages/index.md', STAGING / 'index.md')
    shutil.copytree(ROOT / 'pages/assets', STAGING / 'assets')
    nav = [{'ホーム': 'index.md'}]
    count = 0
    for directory, label in SECTIONS:
        source_dir = ROOT / 'docs' / directory
        if source_dir.is_symlink():
            raise ValueError(f'Symlink is not allowed: {source_dir}')
        entries = []
        for source in source_dir.rglob('*.md'):
            if source.resolve() != source.absolute():
                raise ValueError(f'Symlink is not allowed: {source}')
            text = source.read_text(encoding='utf-8')
            title = re.search(r'^# (.+)$', text, re.MULTILINE)
            identifier = re.search(r'^id: (\S+)$', text, re.MULTILINE)
            if not title or not identifier:
                raise ValueError(f'Title / ID missing: {source}')
            relative = source.relative_to(ROOT / 'docs')
            target = STAGING / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(source, target)
            entries.append((identifier[1], title[1], relative.as_posix()))
            count += 1
        nav.append({label: [{title: path} for _, title, path in sorted(entries)]})
    generated = {'INHERIT': 'mkdocs.yml', 'nav': nav}
    (ROOT / 'mkdocs.generated.yml').write_text(
        yaml.safe_dump(generated, allow_unicode=True, sort_keys=False), encoding='utf-8')
    print(f'Staged {count} general knowledge documents; Evidence / Insight excluded.')


if __name__ == '__main__':
    prepare()
