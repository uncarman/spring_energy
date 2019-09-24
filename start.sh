#启动命令所在目录
#HOME='/home/deploy/www/energy'
#获取mac地址（唯一的）
mac=`ifconfig | grep eth0 | awk '{print $5}'`
start(){
  #进入命令所在目录
  nohup java -Dspring.profiles.active=prod -jar energy-1.0.jar &
}
stop(){
  #kill 掉所有java程序
  ps -ef | grep java | grep -v grep |awk '{print $2}' | xargs sudo kill -9
}
case $1 in
  start)
   start
  ;;
  stop)
   stop
  ;;
  restart)
   $0 stop
   sleep 2
   $0 start
  ;;
  *)
   echo "Usage: {start|stop|restart}"
  ;;
esac
exit 0
