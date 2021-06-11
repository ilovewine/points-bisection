import random
import sys


def generateRandomGraph(file_name,no_of_points,a,b,c,dist):
    """Generates (around) no_of_points from [-a,a] x [-b,b] x [-c,c]
    Stores the result to the file file_name. Format: first line -
    number of points; second line the dist parameter; next a b c (line by line)
    coordinates separated by space.
    """

    outFile = open (file_name,'w')
    outFile.write(str(no_of_points)+'\n')
    outFile.write(str(dist)+'\n')

    set_of_points=set([])

    for _ in range (no_of_points):
        u=round(random.uniform(-a,a),2)
        v=round(random.uniform(-b,b),2)
        w=round(random.uniform(-c,c),2)
        set_of_points.add((u,v,w))

    print ('Generated ',len(set_of_points),' different points.')

    for point in set_of_points:
        outFile.write(str(point[0])+' ')
        outFile.write(str(point[1])+' ')
        outFile.write(str(point[2])+'\n')
    outFile.close()

if len (sys.argv)!=7:
    print ('Program generates given number of points from [-a,a] x [-b,b] x [-c,c]')
    print ('Random points generator usage:')
    print ('random file_name no_of_points a b c dist')


else:
    generateRandomGraph(sys.argv[1],
                        int(sys.argv[2]),
                        float(sys.argv[3]),
                        float(sys.argv[4]),
                        float(sys.argv[5]),
                        float(sys.argv[6]))
