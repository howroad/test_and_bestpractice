$(function(){
    debugger;
    let str1 = "";
    let str2 = "str2";

    let num1 = 1;
    let num2 = Number.NaN;
    let num3 = Number.MIN_VALUE;
    let num41 = Number.NEGATIVE_INFINITY; //负无穷
    let num42 = Number.POSITIVE_INFINITY; //正无穷
    let num4 = Infinity;
    let num5 = Number.MAX_VALUE;
    let num6 = 0;

    let boo1 = false;
    let boo2 = true;

    let nul = null;

    let udf = undefined;

    let obj = new Object();


    //所有类型转字符串
    let toStr1 = String(num1);
    let toStr3 = String(num2);
    let toStr4 = String(num3);
    let toStr5 = String(num4);
    let toStr6 = String(num5);
    let toStr7 = String(num6);
    let toStr8 = String(boo1);
    let toStr9 = String(boo2);
    let toStr10 = String(nul);
    let toStr11 = String(udf);
    let toStr12 = String(obj);

    //所有类型转数字
    let toNum1 = Number(str1);
    let toNum2 = Number(str2);
    let toNum3 = Number(boo1);
    let toNum4 = Number(boo2);
    let toNum5 = Number(nul);
    let toNum6 = Number(udf);
    let toNum7 = Number(obj);

    //所有类型转布尔
    let toBol1 = Boolean(str1);
    let toBol2 = Boolean(str2);
    let toBol4 = Boolean(num1);
    let toBol5 = Boolean(num2);
    let toBol6 = Boolean(num3);
    let toBol7 = Boolean(num4);
    let toBol8 = Boolean(num5);
    let toBol9 = Boolean(num6);
    let toBol10 = Boolean(nul);
    let toBol11 = Boolean(udf);
    let toBol12 = Boolean(obj);

    //所有类型转Obj





});