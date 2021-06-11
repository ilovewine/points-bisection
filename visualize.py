from os import close
import matplotlib.pyplot as graph
from mpl_toolkits.mplot3d import Axes3D
import sys

def read_points(file_name):
    in_file=open(file_name,'r')
    partition_size=int(in_file.readline())
    xa,ya,xb,yb,za,zb=[],[],[],[],[],[]

    for _ in range(partition_size):
        line=in_file.readline()
        l=line.split(' ')
        a,b,c = float(l[0]),float(l[1]),float(l[2])
        xa.append(a)
        ya.append(b)
        za.append(c)

    for line in in_file:
        l=line.split(' ')
        a,b,c= float(l[0]),float(l[1]),float(l[2])
        xb.append(a)
        yb.append(b)
        zb.append(c)
    
    in_file.close()
    return (xa,ya,xb,yb,za,zb) 


if len(sys.argv)!=2:
    print ('Usage: visualize.py file.in')
else:
    
    xa,ya,xb,yb,za,zb=read_points(sys.argv[1])

    picture = graph.figure().add_subplot(111,projection='3d')
    picture.scatter(xa,ya,za,c='red',marker='+')
    picture.scatter(xb,yb,zb,c='green',marker='+')

    graph.show()    
        
