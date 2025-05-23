import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import os

DRIVER_PATH = os.environ.get('DRIVER_PATH')

IKNEEDATA = 'https://ikneedata.com/calculator.html'

SLEEP_TIME = 0

timeout = 3

TRUE_CC = True

# Configure Chrome options
options = Options()
options.headless = True  # Enable headless mode
options.add_argument("--window-size=1920,1200")  # Set the window size

driver = webdriver.Chrome()

# Prep dictionary
kd = {}



start_time = time.time()
# Navigate to the URL
driver.get(IKNEEDATA)
time.sleep(SLEEP_TIME)

# YOSHI DJ ARMOR %
cc_button = driver.find_element(By.ID, 'yoshiDJArmorContainer')
cc_button.click()

# Get list of victims
# select_victim = driver.find_element(By.ID, 'victim-char')
# driver.execute_script("arguments[0].scrollIntoView();", select_victim)
# select_victim.click()
# victim_list = driver.find_elements(By.CSS_SELECTOR, '.hbcharselect.hbcon')
# original_victims = []
# for v in victim_list:
#     text = v.text
#     original_victims.append(v.text)

# all victims
#print(original_victims)#

exclude = []
victims = ['Yoshi']

id_list = []
# Find by character
characters = driver.find_elements(By.CSS_SELECTOR, '.character')
for character in characters:
    characterId = character.get_attribute('id')
    id_list.append(characterId)
    # continue
    print(characterId)
    # Prep dictionary
    kd[characterId] = {}

    character_attacks = driver.find_element(By.ID, characterId)
    #print('clicking ' + character_attacks.text)
    driver.execute_script("arguments[0].scrollIntoView();", character_attacks)
    character_attacks.click()

    time.sleep(SLEEP_TIME)

    # iterate one victim at a time
    for victim in victims:
        export_path = './ys/{characterId}-{victim}-dja.json'

        if os.path.isfile(export_path.format(characterId=characterId,victim=victim)):
            print('found + ' + export_path.format(characterId=characterId,victim=victim) + ', skipping')
            continue
        print('victim - ' + victim)
        # Prep dictionary
        kd[characterId][victim] = {}
        time.sleep(2)
        reselect_victim = driver.find_element(By.ID, 'victim-char')
        reselect_victim.click()
        time.sleep(2)
        new_victim_list = driver.find_elements(By.CSS_SELECTOR, '.hbcharselect.hbcon')
        new_victim_list[0].click()
        selected_victim = [x for x in new_victim_list if victim == x.text][0]
        selected_victim.click()

        time.sleep(SLEEP_TIME)

        # reset % for victim
        percent_textfield = driver.find_element(By.ID, 'percentNumberEdit')
        percent_textfield.click()
        percent_textfield.clear()
        percent_textfield.send_keys('0')

        # print('selected ' + victim)
        time.sleep(SLEEP_TIME)



        # Go in order of attacks
        attacks = driver.find_elements(By.CSS_SELECTOR, '.attack.{characterId}'.format(characterId=characterId))
        # print(str(len(attacks)))
        for i in attacks:

            attackId = i.get_attribute('id')
            #print(attackId)
            kd[characterId][victim][attackId] = {}

            # print('attack id = ' + attackId)
            driver.execute_script("arguments[0].scrollIntoView();", i)
            i.click()

            time.sleep(SLEEP_TIME)

            # SEE IF THERE ARE SUBATTACKS
            subattacks = driver.find_elements(By.CSS_SELECTOR, '.subattack.{attackId}.{characterId}'.format(attackId=attackId,characterId=characterId))
            if len(subattacks) > 0:
                for j in subattacks:
                    subAttackId = j.get_attribute('id')
                    try:
                        kd[characterId][victim][attackId][subAttackId] = {}
                        driver.execute_script("arguments[0].scrollIntoView();", j)
                        j.click()
                        time.sleep(SLEEP_TIME)
                        moveIds = driver.find_elements(By.CSS_SELECTOR,
                                                      '.id.{subAttackId}.{attackId}.{characterId}'.format(subAttackId=subAttackId,attackId=attackId,
                                                                                                 characterId=characterId))
                        # REPEAT PARSING FOR KNOCKDOWN
                        for k in moveIds:
                            moveId = k.get_attribute('id')
                            kd[characterId][victim][attackId][subAttackId][moveId] = -1
                            driver.execute_script("arguments[0].scrollIntoView();", k)
                            k.click()
                            time.sleep(SLEEP_TIME)

                            # CALCULATE KNOCKDOWN %
                            knockdownBox = driver.find_element(By.ID, 'knockdownBox')
                            percent_textfield = driver.find_element(By.ID, 'percentNumberEdit')
                            knockdown = False
                            result = 0

                            percent_textfield.clear()
                            percent_textfield.send_keys(str(0))

                            if knockdownBox.is_displayed():
                                knockdown = True

                            # BINARY SORT TO FIND % QUICKER
                            if not knockdown:
                                low = 1
                                high = 999

                                while low <= high:
                                    mid = (low + high) // 2
                                    percent_textfield.clear()
                                    percent_textfield.send_keys(str(mid))
                                    if knockdownBox.is_displayed():
                                        knockdown = True
                                        result = mid  # potential candidate, but keep searching lower
                                        high = mid - 1
                                    else:
                                        low = mid + 1


                            # RECORD KNOCKDOWN %, ELSE -1
                            if knockdown:
                                kd[characterId][victim][attackId][subAttackId][moveId] = result
                    except:
                        kd[characterId][victim][attackId][subAttackId] = 'ERROR'
            else:
                moveIds = driver.find_elements(By.CSS_SELECTOR,
                                               '.id.{attackId}.{characterId}'.format(attackId=attackId,
                                                   characterId=characterId))
                # REPEAT PARSING FOR KNOCKDOWN
                for k in moveIds:
                    moveId = k.get_attribute('id')
                    kd[characterId][victim][attackId][moveId] = -1
                    driver.execute_script("arguments[0].scrollIntoView();", k)
                    k.click()

                    time.sleep(SLEEP_TIME)

                    # CALCULATE KNOCKDOWN %
                    knockdownBox = driver.find_element(By.ID, 'knockdownBox')
                    percent_textfield = driver.find_element(By.ID, 'percentNumberEdit')
                    knockdown = False
                    result = 0

                    percent_textfield.clear()
                    percent_textfield.send_keys(str(0))

                    if knockdownBox.is_displayed():
                        knockdown = True

                    # BINARY SORT TO FIND % QUICKER
                    if not knockdown:
                        low = 1
                        high = 999

                        while low <= high:
                            mid = (low + high) // 2
                            percent_textfield.clear()
                            percent_textfield.send_keys(str(mid))
                            if knockdownBox.is_displayed():
                                knockdown = True
                                result = mid  # potential candidate, but keep searching lower
                                high = mid - 1
                            else:
                                low = mid + 1

                    # RECORD KNOCKDOWN %, ELSE -1
                    if knockdown:
                        kd[characterId][victim][attackId][moveId] = result

            time.sleep(SLEEP_TIME)

        # EXPORT AS WE COMPLETE A CHARACTER-VICTIM MATCH-UP
        with open(export_path.format(characterId=characterId,victim=victim), 'w') as json_file:
            json.dump(kd, json_file, indent=4)

        del kd[characterId][victim]
        # break
    del kd[characterId]
    # break
# It's a good practice to close the browser when done
#time.sleep(5)
driver.quit()
print(id_list)
# file_path = 'data.json'
#
# with open(file_path, 'w') as json_file:
#     json.dump(kd, json_file, indent=4)

print("Parsed in %s seconds" % (time.time() - start_time))


