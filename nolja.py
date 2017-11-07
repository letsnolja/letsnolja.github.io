import sys
import subprocess
import os
import datetime

def gitCommit():
	subprocess.check_output(['git','add','.'])
	status = subprocess.check_output(['git','status'])
	print(status)
	commit_text = raw_input("Commit text : ")
	if commit_text == "" :
		commit_text = "[{}] Auto-commit".format(datetime.datetime.now().strftime("%d/%m/%y %H:%M:%S"))
	print(commit_text)
	subprocess.check_output(['git','commit','-m',commit_text])
	
def gitPush():
	subprocess.check_output(['git','push'])

def openProject():
	sys.stdout.write("[*] Checking git project ... ")
	if os.path.isdir('.git'):
		print('[OK]')
	else :
		print("[ERROR]")
	sys.stdout.write('[*] Opening in Atom ... ')
	try :
		subprocess.check_output(['atom','.'])
		print('[OK]')
	except OSError :
		print('[ERROR]')
		print("[X] Atom doesn't seem to be installed")
	

def configureGit() :
	name = raw_input('Entre ton nom : ')
	email = raw_input('Entre ton email : ')
	
	sys.stdout.write('[*] Setting name ... ')
	sys.stdout.flush()
	subprocess.check_output(['git','config','user.name',name])
	print('[OK]')
	
	sys.stdout.write('[*] Setting email ... ')
	sys.stdout.flush()
	subprocess.check_output(['git','config','user.email',email])
	print('[OK]')
	
while True :
	print('1. Commit')
	print('2. Push')
	print('3. Config')
	print('4. Open project')
	n = raw_input("# ")
	if n == '1':
		gitCommit()
	elif n == '2':
		gitPush()
	elif n == '3':
		configureGit()
	elif n == '4':
		openProject()
	else :
		continue
	break
