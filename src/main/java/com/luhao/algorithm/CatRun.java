package com.luhao.algorithm;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * <p>Title: CatRun.java</p>
 *
 * <p>Description: </p>
 *
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * 
 * @since：2019年4月22日 上午9:22:29
 * 
 */
public class CatRun {

    public static void main(String[] args) {
        @SuppressWarnings("resource")
        int x = new Scanner(System.in).nextInt();
        resolve(x);
    }
    
    
    /**
     * 题目描述： 
                        小招喵喜欢在数轴上跑来跑去，假设它现在站在点n处，它只会3种走法，分别是： 
                        1.数轴上向前走一步，即n=n+1; 
                        2.数轴上向后走一步，即n=n-1; 
                        3.数轴上使劲跳跃到当前点的两倍，即n=2*n 
                        现在小招喵在原点，即n=0，它想去点x处，快帮小招喵算算最快的走法需要多少步？ 
                        输入描述： 
                        小招喵想去的位置x 
                        输出描述： 
                        小招喵最少需要的步数 
     * @Description:
     * @return void
     * @author luhao
     * @since：2019年4月22日 上午9:23:07
     */
    public static void resolve(int order) {
        List<List<Integer>> planList = new ArrayList<List<Integer>>();
        List<Integer> plan = new ArrayList<Integer>();
        plan.add(0);
        planList.add(plan);
        step(planList, order);
        
    }
    
    public static void step(List<List<Integer>> planList,int order) {
        if(order ==0) {
            System.out.println(0);
            return;
        }
        boolean isReturn = false;
        List<List<Integer>> addList = new ArrayList<List<Integer>>();
        for (List<Integer> plan1 : planList) {
            List<Integer> plan2 = new ArrayList<Integer>();
            List<Integer> plan3 = new ArrayList<Integer>();
            plan2.addAll(plan1);
            plan3.addAll(plan1);
            
            plan1.add(getLast(plan1) + 1);
            plan2.add(getLast(plan2) - 1);
            plan3.add(getLast(plan3) * 2);
            
            addList.add(plan2);
            addList.add(plan3);
        }
        planList.addAll(addList);
        for (List<Integer> plan : planList) {
            int sum = getLast(plan);
            if(sum == order) {
                //System.out.println(plan);
                isReturn = true;
                System.out.println(plan.size() -1);
                return ;
            }
        }
        if(!isReturn) {
            step(planList, order);
        }
        
    }
    public static Integer getLast(List<Integer> plan) {
        Integer size = plan.size();
        return plan.get(size - 1);
    }
}
