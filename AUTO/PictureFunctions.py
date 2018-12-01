def box_to_rectangle(my_list):
    min_x = -100000
    max_x = 100000
    min_y = -100000
    max_y = 100000

    for item in my_list:
        if min_x > item[0]: min_x = item[0]
        if max_x < item[0]: max_x = item[0]
        if min_y > item[1]: min_y = item[1]
        if max_y > item[1]: max_y = item[1]

    return min_x, max_x, min_y, max_y

