package com.javase.a01_paixu;

import java.util.Arrays;

/**
 * <p>Title: Rank01.java</p>
 * <p>Description: 排序算法</p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-09-28 11:32
 */
public class Rank01 {

    public static void main(String[] args) {
        int[] arrys = new int[]{3, 7, 6, 7, 89, 0, -2, 2, 7, 345, 3452, 6722, 66, 131, 23, 12, 312, 1, 4, 55, 46, 8, 89, 9, 9, 6, 999999};
        //rank4(arrys);
        quickSort2(arrys, 0, arrys.length - 1);
        System.out.println(Arrays.toString(arrys));
    }


    // 冒泡1:每个元素跟他后面的下一个比较
    public static void rank2(int[] arrs) {
        int len = arrs.length;
        int rankNums = 0;
        for (int i = 0; i < len - 1; i++) {
            for (int j = 0; j < len - 1 - i; j++) {
                if (arrs[j] > arrs[j + 1]) {
                    arrs[j + 1] ^= arrs[j];
                    arrs[j] ^= arrs[j + 1];
                    arrs[j + 1] ^= arrs[j];
                    rankNums++;
                }
            }
        }
        System.out.println(String.format("rank2排序%d次。", rankNums));
    }

    // 冒泡2 如果有序那么数组不会有任何交换
    public static void rank3(int[] arrs) {
        int len = arrs.length;
        int rankNums = 0;
        boolean isLimit = true;
        for (int i = 0; i < len - 1; i++) {
            for (int j = 0; j < len - 1 - i; j++) {
                if (arrs[j] > arrs[j + 1]) {
                    isLimit = false;
                    arrs[j + 1] ^= arrs[j];
                    arrs[j] ^= arrs[j + 1];
                    arrs[j + 1] ^= arrs[j];
                    rankNums++;
                }
            }
            if (isLimit) {
                break;
            }
        }
        System.out.println(String.format("rank3排序%d次。", rankNums));
    }

    // 选择排序：每轮记录最小的数的下标，最后跟最前面的数交换
    public static void rank4(int[] arrs) {
        int rankNums = 0;
        int len = arrs.length;
        int min = 0, minIndex = 0;
        for (int i = 0; i < len - 1; i++) {
            min = arrs[i];
            minIndex = i;
            for (int j = i + 1; j < len; j++) {
                if (arrs[j] < min) {
                    min = arrs[j];
                    minIndex = j;
                }
            }
            if (minIndex != i) {
                arrs[minIndex] = arrs[i];
                arrs[i] = min;
                rankNums++;
            }
        }
        System.out.println(String.format("选择排序%d次。", rankNums));
    }

    //设置一个基准数，和两个指针。每次排序保证左边的比基准数小，右边的比基准数大
    public static void quickSort(int[] arrs, int left, int right) {
        if (left >= right) {
            return;
        }
        int base = arrs[left];
        int leftFlag = left;
        int rightFlag = right;
        while (leftFlag < rightFlag) {
            while (arrs[rightFlag] >= base && leftFlag < rightFlag) {
                rightFlag--;
            }
            while (arrs[leftFlag] <= base && leftFlag < rightFlag) {
                leftFlag++;
            }
            if (leftFlag != rightFlag) {
                arrs[leftFlag] ^= arrs[rightFlag];
                arrs[rightFlag] ^= arrs[leftFlag];
                arrs[leftFlag] ^= arrs[rightFlag];
            }
        }
        arrs[left] = arrs[leftFlag];
        arrs[leftFlag] = base;

        quickSort(arrs, left, leftFlag - 1);
        quickSort(arrs, leftFlag + 1, right);
    }


    //默写quickSort
    public static void quickSort2(int[] arrs, int left, int right) {
        if (left >= right) {
            return;
        }
        int base = arrs[left], leftFlag = left, rightFlag = right;
        while(leftFlag < rightFlag) {
            //这里要找比基准数小的，所以用大于等于
            while(arrs[rightFlag] >= base && leftFlag < rightFlag) {
                rightFlag --;
            }
            while(arrs[leftFlag] <= base && leftFlag < rightFlag) {
                leftFlag ++;
            }
            if (leftFlag != rightFlag) {
                arrs[leftFlag] ^= arrs[rightFlag];
                arrs[rightFlag] ^= arrs[leftFlag];
                arrs[leftFlag] ^= arrs[rightFlag];
            }
        }
        arrs[left] = arrs[leftFlag];
        arrs[leftFlag] = base;

        quickSort2(arrs, left, leftFlag - 1);
        quickSort2(arrs, leftFlag + 1, right);

    }
}
