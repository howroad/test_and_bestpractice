package com.luhao.redis;

/**
 * <p>Title: TestRedis.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-03-25 15:05
 */
public class TestRedis {
    /**
     * 类型 string(set get) hash(hmset hget) list(lpush lrange) set(sadd smembers) zset(zadd zrange)
     */

    /**
     * EXISTS key 判断key是否存在
     * EXPIRE key seconds 给key设置过期时间
     * PERSIST key 移除key的过期时间
     * PEXPIRE key milliseconds 给key设置过期时间毫秒计
     * PTTL key 返回Key的过期时间 毫秒
     * KEYS pattern 匹配 好像只能用*
     * RENAME key newkey 修改 key 的名称
     * RENAMENX key newkey 当newKey不存在的时候修改key的名称
     * TYPE key 返回Key的类型
     *
     *
     * string相关
     * GETRANGE key start end 获得key的值的子字符
     * GETSET key value 重新设置key为新value 返回oldValue
     * GETBIT key offset 对 key 所储存的字符串值，获取指定偏移量上的位(bit)。注：获得value的第offset的二进制位
     * SETBIT key offset VALUE 将值的第offset位设置为value
     * MGER key [key1 key2] 获得这些key的值
     * Setex 命令为指定的 key 设置值及其过期时间。如果 key 已经存在， SETEX 命令将会替换旧的值。
     * SETNX 当不存在的时候设置key的值，（nx是安全的设置）
     * strlen 返回 key 所储存的字符串值的长度。
     * MSET/MSETNX 同时设置一个或多个 key-value 对。
     * INCR key 将key所在的数字+1 DECR key -1
     * INCRBY key increment 将key所在的数字+increment DECRBY KEY
     * INCRBYFLOAR KEY increment 将key所在的数字+increment注意浮点数有精度问题 且该方法没有DECRBYFLOAT
     *
     * */
}
