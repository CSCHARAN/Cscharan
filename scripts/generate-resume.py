"""Build the downloadable resume from data/profile.js. Run from the project root."""
import json
import subprocess
from pathlib import Path
from html import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import {profile,skillGroups} from './data/profile.js'; console.log(JSON.stringify({profile,skillGroups}));"
], cwd=ROOT, text=True))
p = DATA['profile']
for weight in (400, 500, 600, 700):
    pdfmetrics.registerFont(TTFont(f'Inter{weight}', str(ROOT / f'public/fonts/inter-{weight}.ttf')))
pdfmetrics.registerFontFamily('Inter400', normal='Inter400', bold='Inter600', italic='Inter400', boldItalic='Inter600')
navy = HexColor('#15263b')
text = HexColor('#263548')
muted = HexColor('#526579')
accent = HexColor('#28829c')
styles = {
    'name': ParagraphStyle('name', fontName='Inter600', fontSize=27, leading=32, textColor=navy, spaceAfter=3),
    'role': ParagraphStyle('role', fontName='Inter500', fontSize=10.5, leading=15, textColor=accent, spaceAfter=7),
    'contact': ParagraphStyle('contact', fontName='Inter400', fontSize=8.8, leading=12.4, textColor=muted, spaceAfter=2),
    'body': ParagraphStyle('body', fontName='Inter400', fontSize=9.4, leading=12.6, textColor=text, spaceAfter=3.5),
    'heading': ParagraphStyle('heading', fontName='Inter600', fontSize=10.4, leading=14, textColor=navy, spaceBefore=8.5, spaceAfter=4),
    'entry': ParagraphStyle('entry', fontName='Inter400', fontSize=9.4, leading=12.6, textColor=text, spaceBefore=3.5, spaceAfter=2),
}

def clean(value):
    return escape(str(value).replace('\u2013', '-').replace('\u2014', '-').replace('\u00b7', '|'))

def link(label, url):
    return f'<link href="{escape(url, quote=True)}" color="#28829c">{clean(label)}</link>'

story = []
def para(value, style='body'):
    story.append(Paragraph(value, styles[style]))

def heading(label):
    para(clean(label), 'heading')

para(clean(p['name']), 'name')
para('Cybersecurity undergraduate | Networking, Linux &amp; application development', 'role')
para(f'{link(p["email"], "mailto:"+p["email"])} &nbsp; | &nbsp; {link(p["phone"], "tel:"+p["phone"])}', 'contact')
para(f'{link("linkedin.com/in/cscharan", p["linkedin"])} &nbsp; | &nbsp; {link("github.com/CSCHARAN", p["github"])} &nbsp; | &nbsp; {link("Portfolio", p["portfolio"])}', 'contact')
story.append(Spacer(1, 7))
story.append(HRFlowable(width='100%', thickness=0.8, color=HexColor('#b4c9d5'), spaceAfter=2))

heading('Profile')
para('B.Tech undergraduate in Computer Science (Cyber Security) with a foundation in networking, Linux, Python, and security fundamentals. Practical exposure through a cybersecurity internship, TryHackMe labs, and CTF competitions. Interested in vulnerability assessment, network security, threat analysis, and secure system administration.')

heading('Technical skills')
for group in DATA['skillGroups']:
    para(f'<b>{clean(group["title"])}:</b> {clean(", ".join(group["skills"]))}')

heading('Education')
para(f'<b>{clean(p["education"]["degree"])} - {clean(p["education"]["university"])}</b>')
para(f'{clean(p["education"]["duration"])} &nbsp; | &nbsp; CGPA: {clean(p["education"]["cgpa"])}')

heading('Experience')
for category in ('Cybersecurity', 'Content creation'):
    entry = next(item for item in p['experience'] if item['category'] == category)
    para(f'<b>{clean(entry["role"])} - {clean(entry["company"])}</b> &nbsp; | &nbsp; {clean(entry["duration"])}', 'entry')
    para(clean(entry['description']))
additional = [item for item in p['experience'] if item['category'] not in ('Cybersecurity', 'Content creation')]
para('<b>Additional experience:</b> '+ '; '.join(f'{clean(e["role"])} at {clean(e["company"])} ({clean(e["duration"])})' for e in additional)+'.')

heading('Projects')
for project in p['projects']:
    para(f'<b>{clean(project["title"])}</b> &nbsp; | &nbsp; {clean(" / ".join(project["technologies"]))}', 'entry')
    if 'Online' in project['title'] or 'examination' in project['title']:
        para('Developed a Java and SQL examination platform with user authentication, exam management, automated results, and database storage for student records, examinations, and results.')
    else:
        para('Built a responsive HTML and CSS portfolio showcasing technical skills, certifications, projects, and achievements, with structured layouts and mobile-friendly design.')

heading('Courses & practical learning')
for course in p['courses']:
    para(f'<b>{clean(course["title"])}</b> - {clean(course["provider"])}')
para('<b>Hands-on practice:</b> TryHackMe cybersecurity labs and CTF competitions, including Love at First Breach CTF and LAFB CTF Advanced.')

heading('Community & leadership')
para('Cybersecurity educator and content creator on YouTube. Team leader in a data copy associate role during Vibrant Gujarat 2026.')

output = ROOT / 'public/S-Charan-resume.pdf'
doc = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=38, leftMargin=38, topMargin=32, bottomMargin=32, title=f'{p["name"]} - Cybersecurity resume', author=p['name'], subject='Cybersecurity undergraduate resume')
doc.build(story)
print(output)
