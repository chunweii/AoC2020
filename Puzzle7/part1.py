r = open('input.txt','r').read()
input = r.replace(' bags','').replace(' bag','').replace('.','').splitlines()
def search(input):
    table = [x.split(' contain ') for x in input]
    print(table)
    found = ['shiny gold']
    index = 0
    while index < len(found):
        for entry in table:
            if entry[1].find(found[index]) != -1 and entry[0] not in found:
                found.append(entry[0])
        index = index + 1
    return len(found)-1

search(input)