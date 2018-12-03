import string
import random

target = 'METHINKS IT IS LIKE A WEASEL'
rand_str = ''.join(random.choice(string.ascii_uppercase + ' ') for _ in range(len(target)))
mut = 5
copies = 100

def mod_rand_str(rand_str):
    new_str = rand_str
    for i in range(len(target)):
        probability = random.randint(0, 100)
        if probability <= mut:
            new_str = new_str[:i] + random.choice(string.ascii_uppercase + ' ') + new_str[i+1:]
    return new_str

def mod_rand_str_lock(rand_str):
    new_str = rand_str
    for i in range(len(target)):
        if new_str[i] != target[i]:
            probability = random.randint(0, 100)
            if probability <= mut:
                new_str = new_str[:i] + random.choice(string.ascii_uppercase + ' ') + new_str[i+1:]
    return new_str

def comp_str(rand_str):
    matches = 0
    for i in range(len(target)):
        if target[i] == rand_str[i]:
            matches += 1
    return matches

result_list = []
str_found = False
loop_number = 0
while not str_found:
    str_list = [''] * copies
    matches_list = [None] * copies
    for i in range(copies):
        str_list[i] = mod_rand_str(rand_str)
        matches_list[i] = comp_str(str_list[i])
    max_matches = max(matches_list)
    if max_matches == len(target):
        str_found = True
    rand_str = str_list[matches_list.index(max_matches)]
    result_list.append(str(loop_number) + ': ' + rand_str + ' | matches= ' + str(max_matches) +
                       ' | index in gen= ' + str(matches_list.index(max_matches)) )
    loop_number += 1

for i in result_list:
    print i
