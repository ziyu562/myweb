from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math

OUT = Path('/Users/liuziyu/myweb/.work/cv_tracy_iag/assets/tracy_my_daily_life.png')
W,H = 1200,820
img=Image.new('RGB',(W,H),'white')
d=ImageDraw.Draw(img)

def font(size,bold=False):
    candidates = [
        '/System/Library/Fonts/Supplemental/Arial Bold.ttf' if bold else '/System/Library/Fonts/Supplemental/Arial.ttf',
        '/System/Library/Fonts/Supplemental/Helvetica.ttf',
        '/Library/Fonts/Arial.ttf'
    ]
    for p in candidates:
        try:
            return ImageFont.truetype(p,size)
        except Exception:
            pass
    return ImageFont.load_default()

F_TITLE=font(70, True); F_LABEL=font(35); F_CENTER=font(47, True); F_SMALL=font(26)
blue='#55a9f7'; dark='#3f3f42'; line='#8f9499'
# Title
d.text((90,50),'My Daily Life',font=F_TITLE,fill=dark)
d.line((530,92,560,92),fill=blue,width=5)
d.line((530,92,548,74),fill=blue,width=5)
d.line((530,92,548,110),fill=blue,width=5)
d.line((0,135,W,135),fill='#9db9d7',width=6)

cx,cy=590,435
R=285
r0=108
colors=['#bfe4f0','#78cfc6','#d8f1ee','#b9e4df','#d5f1ea','#78b5ef','#aed2f2']
labels=['Swimming','Coffee','Learning\nNew Tech','Hiking','Cooking & Food\nExploration','Singing','Social']
# angles clockwise from top-left-ish
start=-90
n=7
for i in range(n):
    a1=start+i*360/n
    a2=start+(i+1)*360/n
    d.pieslice((cx-R,cy-R,cx+R,cy+R),a1,a2,fill=colors[i],outline='white',width=7)
# center circle
d.ellipse((cx-r0,cy-r0,cx+r0,cy+r0),fill='white',outline='#a9dfd6',width=8)
d.text((cx,cy-34),'My',font=F_CENTER,fill=dark,anchor='mm')
d.text((cx,cy+30),'Interests',font=F_CENTER,fill=dark,anchor='mm')
# radial separators
for i in range(n):
    a=math.radians(start+i*360/n)
    d.line((cx+r0*math.cos(a),cy+r0*math.sin(a),cx+R*math.cos(a),cy+R*math.sin(a)),fill='white',width=7)

# Helper draw people/icons in segments
def polar(rad,ang):
    a=math.radians(ang)
    return cx+rad*math.cos(a), cy+rad*math.sin(a)

def draw_female(x,y,scale=1.0, laptop=False, hiking=False):
    s=scale
    # hair/head
    d.ellipse((x-18*s,y-42*s,x+18*s,y-6*s),fill='#f6c48d',outline='#1f3344',width=max(1,int(2*s)))
    d.pieslice((x-25*s,y-50*s,x+22*s,y-12*s),180,360,fill='#26384a',outline='#1f3344')
    d.arc((x-25*s,y-50*s,x+22*s,y-12*s),180,360,fill='#1f3344',width=max(1,int(2*s)))
    if laptop:
        d.rectangle((x-40*s,y+5*s,x+42*s,y+52*s),fill='#d9edf4',outline='#1f3344',width=max(1,int(2*s)))
        d.rectangle((x-48*s,y+52*s,x+50*s,y+59*s),fill='#9bb7c8',outline='#1f3344')
    elif hiking:
        d.line((x-5*s,y-5*s,x-20*s,y+38*s),fill='#1f3344',width=max(2,int(4*s)))
        d.line((x-5*s,y-5*s,x+28*s,y+36*s),fill='#1f3344',width=max(2,int(4*s)))
        d.line((x-16*s,y+34*s,x-40*s,y+66*s),fill='#1f3344',width=max(2,int(4*s)))
        d.line((x+20*s,y+31*s,x+38*s,y+66*s),fill='#1f3344',width=max(2,int(4*s)))
        d.rectangle((x-24*s,y-5*s,x+13*s,y+30*s),fill='#6da7db',outline='#1f3344')
        d.ellipse((x-35*s,y-2*s,x-12*s,y+30*s),fill='#f1a34f',outline='#1f3344')
        d.line((x+36*s,y-3*s,x+52*s,y+70*s),fill='#1f3344',width=max(1,int(3*s)))
    else:
        d.rectangle((x-28*s,y-6*s,x+28*s,y+40*s),fill='#f1a34f',outline='#1f3344')

def draw_swim(x,y):
    d.arc((x-45,y-25,x+45,y+25),180,360,fill='#1f3344',width=5)
    d.arc((x-70,y,x-10,y+45),180,360,fill='#55a9f7',width=5)
    d.arc((x+10,y,x+70,y+45),180,360,fill='#55a9f7',width=5)
    d.ellipse((x-12,y-48,x+12,y-24),fill='#f6c48d',outline='#1f3344',width=3)
    d.rectangle((x-28,y-23,x+28,y-5),fill='#ea6d6d',outline='#1f3344',width=3)

def draw_coffee(x,y):
    d.rounded_rectangle((x-38,y-50,x+28,y+45),radius=11,fill='#f7efe0',outline='#1f3344',width=4)
    d.rectangle((x-38,y-32,x+28,y+5),fill='#c58d50')
    d.arc((x+20,y-18,x+62,y+20),-80,90,fill='#1f3344',width=4)
    for dx in [-20,0,20]:
        d.arc((x+dx-10,y-92,x+dx+10,y-58),200,335,fill='#6e6e6e',width=3)

def draw_music(x,y):
    d.ellipse((x-55,y+15,x-18,y+52),fill='#1f3344')
    d.rectangle((x-20,y-75,x-12,y+31),fill='#1f3344')
    d.pieslice((x-18,y-80,x+45,y-20),90,270,fill=None,outline='#1f3344',width=8)
    d.ellipse((x+40,y+0,x+77,y+37),fill='#1f3344')
    d.rectangle((x+75,y-90,x+83,y+17),fill='#1f3344')
    d.arc((x-8,y-93,x+88,y-25),190,345,fill='#1f3344',width=6)

def draw_food(x,y):
    d.ellipse((x-75,y-30,x+75,y+50),fill='#d7e9ef',outline='#1f3344',width=4)
    d.arc((x-75,y-30,x+75,y+50),0,180,fill='#1f3344',width=4)
    for dx,c in [(-38,'#d8584f'),(-8,'#f2c14e'),(20,'#7fcf82'),(48,'#d8584f')]:
        d.ellipse((x+dx-15,y-28,x+dx+15,y+2),fill=c,outline='#1f3344',width=2)
    d.line((x-25,y-75,x+5,y-15),fill='#1f3344',width=5)
    d.line((x+18,y-78,x+35,y-15),fill='#1f3344',width=5)
    d.ellipse((x+9,y-92,x+27,y-72),fill='white',outline='#1f3344',width=3)

def draw_social(x,y):
    draw_female(x-42,y+10,.9)
    # second simple head
    d.ellipse((x+20,y-30,x+55,y+6),fill='#f0b17f',outline='#1f3344',width=2)
    d.pieslice((x+15,y-42,x+58,y-5),260,80,fill='#24384b')
    d.rectangle((x+15,y+5,x+63,y+46),fill='#7dc0dd',outline='#1f3344')
    d.rounded_rectangle((x-35,y-82,x+8,y-46),radius=5,fill='#7dcfe6',outline='#1f3344',width=2)
    d.rounded_rectangle((x+15,y-75,x+63,y-38),radius=5,fill='#ffbd57',outline='#1f3344',width=2)
    d.text((x-22,y-70),'…',font=font(22,True),fill='#1f3344')
    d.text((x+30,y-64),'…',font=font(22,True),fill='#1f3344')

# Icons centers by label order around donut
icon_positions = [polar(205,-115), polar(205,-165), polar(205,178), polar(205,125), polar(205,65), polar(205,12), polar(205,-38)]
for lab,(x,y) in zip(labels, icon_positions):
    x=int(x); y=int(y)
    if lab.startswith('Swimming'): draw_swim(x,y)
    elif lab.startswith('Coffee'): draw_coffee(x,y)
    elif lab.startswith('Learning'): 
        draw_female(x,y-8,.85,laptop=True)
        for j,c in enumerate(['#55a9f7','#ffbd57','#78cfc6','#ea6d6d']):
            d.rounded_rectangle((x-88+j*37,y-62,x-62+j*37,y-36),radius=4,fill=c)
    elif lab.startswith('Hiking'):
        draw_female(x,y-22,.9,hiking=True)
        d.polygon([(x-105,y+75),(x-60,y+15),(x-15,y+75)],fill='#b7dce4')
        d.polygon([(x-20,y+75),(x+35,y+5),(x+90,y+75)],fill='#8ec6d6')
    elif lab.startswith('Cooking'): draw_food(x,y)
    elif lab.startswith('Singing'): draw_music(x,y)
    elif lab.startswith('Social'): draw_social(x,y)

# labels with connector lines
label_data=[
    ('Swimming',(120,170),polar(R+8,-115)),
    ('Coffee',(82,315),polar(R+8,-165)),
    ('Learning\nNew Tech',(88,520),polar(R+8,178)),
    ('Hiking',(350,735),polar(R+8,125)),
    ('Cooking & Food\nExploration',(860,560),polar(R+8,65)),
    ('Singing',(915,300),polar(R+8,12)),
    ('Social',(815,165),polar(R+8,-38)),
]
for text,(lx,ly),(px,py) in label_data:
    # dot and connector elbow
    d.ellipse((px-5,py-5,px+5,py+5),fill='#26384a')
    midx = lx+180 if lx < cx else lx-40
    d.line((px,py,midx,py,midx,ly+18),fill=line,width=2)
    for k,line_txt in enumerate(text.split('\n')):
        d.text((lx,ly+k*42),line_txt,font=F_LABEL,fill=dark)

# crop/outline subtle bottom line similar to reference
d.line((0,730,80,730),fill='#9db9d7',width=5)
d.line((1120,730,W,730),fill='#9db9d7',width=5)
OUT.parent.mkdir(parents=True, exist_ok=True)
img.save(OUT, quality=95)
print(OUT)
