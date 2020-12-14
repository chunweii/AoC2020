f = open("input.txt", "r")

adapt = [0]
counters = [0,0,0,0]

for line in f:
    adapt.append(int(line))

adapt.sort()
adapt.append(adapt[-1]+3)
lengths = dict()

for i in range(1,len(adapt)):
    counters[adapt[i]-adapt[i-1]] += 1
    lengths[adapt[i]] = 0

lengths[0] = 1

for location in adapt:          
    for step in range(1,4):            
        if location + step in lengths:
            lengths[location+step] += lengths[location]

print(counters[1]*counters[3])