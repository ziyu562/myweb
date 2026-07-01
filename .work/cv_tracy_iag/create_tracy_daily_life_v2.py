from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import math

OUT=Path('/Users/liuziyu/myweb/.work/cv_tracy_iag/assets/tracy_my_daily_life_v2.png')
W,H=1100,760
S=3
img=Image.new('RGB',(W*S,H*S),'white')
d=ImageDraw.Draw(img)

def sc(v): return int(v*S)
def font(size,bold=False):
    paths=[
        '/System/Library/Fonts/Supplemental/Arial Bold.ttf' if bold else '/System/Library/Fonts/Supplemental/Arial.ttf',
        '/System/Library/Fonts/Supplemental/Helvetica.ttf'
    ]
    for p in paths:
        try: return ImageFont.truetype(p, sc(size))
        except: pass
    return ImageFont.load_default()

F_LABEL=font(30); F_CENTER=font(36); F_CENTER_B=font(37,True); F_SMALL=font(18)
dark=(55,57,62); ink=(34,49,62); line=(142,145,148); blue=(77,157,231)
# soft shadow behind donut
cx,cy,R,r0=sc(540),sc(345),sc(248),sc(90)
shadow=Image.new('RGBA',img.size,(0,0,0,0)); sd=ImageDraw.Draw(shadow)
sd.ellipse((cx-R+sc(6),cy-R+sc(10),cx+R+sc(6),cy+R+sc(10)),fill=(42,80,90,35))
shadow=shadow.filter(ImageFilter.GaussianBlur(sc(10)))
img=Image.alpha_composite(img.convert('RGBA'),shadow).convert('RGB'); d=ImageDraw.Draw(img)

colors=[(177,223,235),(126,207,198),(205,238,232),(185,228,221),(211,241,236),(113,178,233),(174,212,241)]
labels=['Swimming','Coffee','Learning\nNew Tech','Hiking','Cooking & Food\nExploration','Singing','Social']
start=-90; n=7
# donut segments
for i,c in enumerate(colors):
    a1=start+i*360/n; a2=start+(i+1)*360/n
    d.pieslice((cx-R,cy-R,cx+R,cy+R),a1,a2,fill=c,outline='white',width=sc(5))
# separators
for i in range(n):
    a=math.radians(start+i*360/n)
    d.line((cx+r0*math.cos(a),cy+r0*math.sin(a),cx+R*math.cos(a),cy+R*math.sin(a)),fill='white',width=sc(5))
# center
for w,c in [(sc(10),(170,226,218)),(0,(255,255,255))]:
    if w:
        d.ellipse((cx-r0,cy-r0,cx+r0,cy+r0),fill=(255,255,255),outline=c,width=w)
    else:
        d.ellipse((cx-r0+sc(5),cy-r0+sc(5),cx+r0-sc(5),cy+r0-sc(5)),fill='white')
d.text((cx,cy-sc(25)),'My',font=F_CENTER,fill=dark,anchor='mm')
d.text((cx,cy+sc(28)),'Interests',font=F_CENTER_B,fill=dark,anchor='mm')

def polar(rad,ang):
    a=math.radians(ang); return cx+sc(rad)*math.cos(a), cy+sc(rad)*math.sin(a)

def line_round(points,fill,width):
    d.line(points,fill=fill,width=sc(width),joint='curve')

def face(x,y,scale=1,hair=(51,68,79),shirt=(245,169,83)):
    s=S*scale; x=int(x); y=int(y)
    d.ellipse((x-int(14*s),y-int(28*s),x+int(14*s),y),fill=(246,190,137),outline=ink,width=max(1,int(1.5*s)))
    d.pieslice((x-int(20*s),y-int(36*s),x+int(19*s),y-int(3*s)),180,360,fill=hair,outline=ink)
    d.rectangle((x-int(20*s),y+int(4*s),x+int(20*s),y+int(37*s)),fill=shirt,outline=ink,width=max(1,int(1.5*s)))

def swim(x,y):
    x=int(x); y=int(y)
    d.ellipse((x-sc(10),y-sc(42),x+sc(10),y-sc(22)),fill=(248,195,141),outline=ink,width=sc(2))
    d.rectangle((x-sc(28),y-sc(22),x+sc(28),y-sc(6)),fill=(232,91,92),outline=ink,width=sc(2))
    for off in [-35,35]:
        d.arc((x+sc(off-28),y-sc(4),x+sc(off+28),y+sc(42)),180,360,fill=(82,166,239),width=sc(4))
    d.arc((x-sc(46),y-sc(24),x+sc(46),y+sc(24)),190,350,fill=ink,width=sc(3))

def coffee(x,y):
    x=int(x); y=int(y)
    d.rounded_rectangle((x-sc(35),y-sc(44),x+sc(25),y+sc(42)),radius=sc(8),fill=(247,238,221),outline=ink,width=sc(3))
    d.rectangle((x-sc(35),y-sc(26),x+sc(25),y+sc(7)),fill=(190,137,79))
    d.arc((x+sc(18),y-sc(17),x+sc(56),y+sc(20)),270,90,fill=ink,width=sc(3))
    for dx in [-17,2,20]: d.arc((x+sc(dx-8),y-sc(82),x+sc(dx+10),y-sc(52)),200,335,fill=(95,95,95),width=sc(2))

def laptop_girl(x,y):
    face(x,y-sc(10),0.9,hair=(238,126,163),shirt=(96,177,208))
    d.rectangle((int(x-sc(45)),int(y+sc(18)),int(x+sc(45)),int(y+sc(57))),fill=(222,239,244),outline=ink,width=sc(2))
    d.rectangle((int(x-sc(50)),int(y+sc(57)),int(x+sc(50)),int(y+sc(64))),fill=(155,183,200),outline=ink,width=sc(1))
    for j,c in enumerate([(244,181,78),(92,187,220),(239,112,117)]):
        d.rounded_rectangle((int(x+sc(-80+j*45)),int(y-sc(38)),int(x+sc(-56+j*45)),int(y-sc(14))),radius=sc(4),fill=c)

def hiking_girl(x,y):
    x=int(x); y=int(y)
    d.polygon([(x-sc(95),y+sc(68)),(x-sc(50),y+sc(12)),(x-sc(10),y+sc(68))],fill=(184,224,231))
    d.polygon([(x-sc(25),y+sc(68)),(x+sc(35),y-sc(1)),(x+sc(95),y+sc(68))],fill=(142,202,216))
    face(x-sc(5),y-sc(25),0.75,hair=(238,126,163),shirt=(94,157,215))
    line_round((x-sc(8),y-sc(20),x-sc(24),y+sc(25),x-sc(43),y+sc(56)),ink,3)
    line_round((x-sc(8),y-sc(20),x+sc(22),y+sc(22),x+sc(38),y+sc(56)),ink,3)
    d.ellipse((x-sc(32),y-sc(18),x-sc(12),y+sc(22)),fill=(238,155,74),outline=ink,width=sc(2))
    line_round((x+sc(40),y-sc(18),x+sc(55),y+sc(62)),ink,2)

def food(x,y):
    x=int(x); y=int(y)
    d.ellipse((x-sc(70),y-sc(30),x+sc(70),y+sc(43)),fill=(218,235,239),outline=ink,width=sc(3))
    for dx,c in [(-36,(217,78,72)),(-9,(241,190,74)),(18,(112,201,128)),(45,(217,78,72))]:
        d.ellipse((x+sc(dx-14),y-sc(27),x+sc(dx+14),y+sc(2)),fill=c,outline=ink,width=sc(1))
    line_round((x-sc(24),y-sc(70),x+sc(4),y-sc(10)),ink,4)
    line_round((x+sc(20),y-sc(72),x+sc(33),y-sc(12)),ink,4)
    d.ellipse((x+sc(10),y-sc(88),x+sc(26),y-sc(70)),fill='white',outline=ink,width=sc(2))

def music(x,y):
    x=int(x); y=int(y)
    d.ellipse((x-sc(58),y+sc(12),x-sc(23),y+sc(48)),fill=ink)
    d.rectangle((x-sc(25),y-sc(72),x-sc(17),y+sc(26)),fill=ink)
    d.arc((x-sc(22),y-sc(78),x+sc(40),y-sc(18)),90,270,fill=ink,width=sc(7))
    d.ellipse((x+sc(38),y-sc(3),x+sc(74),y+sc(33)),fill=ink)
    d.rectangle((x+sc(72),y-sc(86),x+sc(80),y+sc(14)),fill=ink)
    d.arc((x-sc(12),y-sc(90),x+sc(82),y-sc(26)),190,345,fill=ink,width=sc(5))

def social(x,y):
    face(x-sc(35),y+sc(10),0.8,hair=(238,126,163),shirt=(245,169,83))
    face(x+sc(38),y+sc(12),0.8,hair=(40,58,73),shirt=(120,193,217))
    d.rounded_rectangle((int(x-sc(52)),int(y-sc(80)),int(x-sc(12)),int(y-sc(48))),radius=sc(4),fill=(117,207,230),outline=ink,width=sc(2))
    d.rounded_rectangle((int(x+sc(12)),int(y-sc(74)),int(x+sc(58)),int(y-sc(40))),radius=sc(4),fill=(255,190,85),outline=ink,width=sc(2))
    d.text((x-sc(36),y-sc(70)),'...',font=F_SMALL,fill=ink,anchor='mm')
    d.text((x+sc(34),y-sc(62)),'...',font=F_SMALL,fill=ink,anchor='mm')

positions=[polar(190,-115),polar(190,-165),polar(190,178),polar(190,125),polar(190,65),polar(190,12),polar(190,-38)]
for lab,(x,y) in zip(labels,positions):
    if lab.startswith('Swimming'): swim(x,y)
    elif lab.startswith('Coffee'): coffee(x,y)
    elif lab.startswith('Learning'): laptop_girl(x,y)
    elif lab.startswith('Hiking'): hiking_girl(x,y)
    elif lab.startswith('Cooking'): food(x,y)
    elif lab.startswith('Singing'): music(x,y)
    elif lab.startswith('Social'): social(x,y)

# labels and connectors closer to original reference
label_data=[
    ('Swimming',(95,88),polar(250,-115),150),
    ('Coffee',(70,265),polar(250,-165),180),
    ('Learning\nNew Tech',(22,455),polar(250,178),170),
    ('Hiking',(315,680),polar(250,125),95),
    ('Cooking & Food\nExploration',(825,500),polar(250,65),-65),
    ('Singing',(885,300),polar(250,12),-55),
    ('Social',(790,100),polar(250,-38),-80),
]
for text,(lx,ly),(px,py),elbow in label_data:
    lx=sc(lx); ly=sc(ly); px=int(px); py=int(py)
    d.ellipse((px-sc(4),py-sc(4),px+sc(4),py+sc(4)),fill=ink)
    ex=px+sc(elbow)
    d.line((px,py,ex,py),fill=line,width=sc(1.6))
    d.line((ex,py,ex,ly+sc(18)),fill=line,width=sc(1.6))
    for k,t in enumerate(text.split('\n')):
        d.text((lx,ly+sc(38*k)),t,font=F_LABEL,fill=dark)

# downsample for antialias
img=img.resize((W,H),Image.Resampling.LANCZOS)
OUT.parent.mkdir(parents=True,exist_ok=True)
img.save(OUT,quality=95)
print(OUT)
