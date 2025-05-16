import json

PARSE_CC_DATA = False

id_list = ['Fx', 'Fc', 'Ms', 'Sh', 'Jp', 'Pc', 'Po', 'CF', 'Pk', 'Sm', 'DM', 'Ys', 'Lg', 'Gn', 'Ma', 'YL', 'DK', 'Lk', 'GW', 'Ry', 'Mw', 'Zd', 'Ns', 'Pi', 'Bw', 'Kb']
opp_list = ['Ganon', 'Mario', 'Y.Link', 'DK', 'Link', 'MrG&W', 'Roy', 'Mewtwo', 'Zelda', 'Ness', 'Pichu', 'Bowser', 'Kirby', 'Fox', 'Falco', 'Marth', 'Sheik', 'Puff', 'Peach', 'Popo', 'Nana', 'Falcon', 'Pika', 'Samus', 'Doc', 'Yoshi', 'Luigi']


sorted_opps = ['Falcon', 'DK', 'Fox', 'MrG&W', 'Kirby', 'Bowser', 'Link', 'Luigi', 'Mario', 'Marth', 'Mewtwo', 'Ness', 'Peach', 'Pika', 'Popo', 'Puff', 'Samus', 'Yoshi', 'Zelda', 'Sheik', 'Falco', 'Y.Link', 'Doc', 'Roy', 'Pichu', 'Ganon']
sorted_ids = ['CF', 'DK', 'Fx', 'GW', 'Kb', 'Bw', 'Lk', 'Lg', 'Ma', 'Ms', 'Mw', 'Ns', 'Pc', 'Pi', 'Po', 'Jp', 'Sm', 'Ys', 'Zd', 'Sh', 'Fc', 'YL', 'DM', 'Ry', 'Pc', 'Gn']


def find_lowest_kd(move):
    lowest = 300

    def traverse(obj):
        nonlocal lowest
        if isinstance(obj, (int, float)):
            if lowest is None or obj < lowest:
                if obj != -1:
                    lowest = obj
        elif isinstance(obj, list):
            for item in obj:
                traverse(item)
        elif isinstance(obj, dict):
            for value in obj.values():
                traverse(value)

    traverse(move)
    if lowest != 300:
        return lowest
    else:
        return -1


if __name__ == '__main__':

    unique_moves = set()

    char_id = sorted_ids[0]
    kd = {}

    for i in range(len(sorted_ids)):
        kd[i] = {}
        for opp in sorted_opps:
            cc_file = './cc/{char_id}-{opp}.json'.format(char_id=sorted_ids[i],opp=opp)
            kd_file = './kd/{char_id}-{opp}.json'.format(char_id=sorted_ids[i], opp=opp)
            with open(cc_file) as json_data:
                cc_victim_data = json.load(json_data)
            with open(kd_file) as json_data:
                kd_victim_data = json.load(json_data)

            for key, value in cc_victim_data[sorted_ids[i]][opp].items():
                tempVal = value
                if PARSE_CC_DATA:
                    # account for bug in which throws are affected by CC in ikneedata. default to normal kd values
                    if 'throw' in key:
                        tempVal = kd_victim_data[sorted_ids[i]][opp][key]

                if key in kd[i].keys():

                    kd[i][key] = kd[i][key] + [find_lowest_kd(tempVal)]
                else:
                    kd[i][key] = [find_lowest_kd(tempVal)]
                pass
                unique_moves.add(key)
            json_data.close()

    if PARSE_CC_DATA:
        with open('./parsed/cc_knockdown_data.json', 'w') as json_file:
            json.dump(kd, json_file, indent=4)
    else:
        with open('./parsed/knockdown_data.json', 'w') as json_file:
            json.dump(kd, json_file, indent=4)

    # SANITY CHECK KD OUTPUT
    print(kd)

    # LIST ALL POSSIBLE MOVES FOR UI INFO
    print(unique_moves)



