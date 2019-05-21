$(function(){
    debugger;
    var str1 = "";
    var str2 = "str2";

    var num1 = 1;
    var num2 = Number.NaN;
    var num3 = Number.MIN_VALUE;
    var num41 = Number.NEGATIVE_INFINITY; //负无穷
    var num42 = Number.POSITIVE_INFINITY; //正无穷
    var num4 = Infinity;
    var num5 = Number.MAX_VALUE;
    var num6 = 0;

    var boo1 = false;
    var boo2 = true;

    var nul = null;

    var udf = undefined;

    var obj = new Object();


    //所有类型转字符串
    var toStr1 = String(num1);
    var toStr3 = String(num2);
    var toStr4 = String(num3);
    var toStr5 = String(num4);
    var toStr6 = String(num5);
    var toStr7 = String(num6);
    var toStr8 = String(boo1);
    var toStr9 = String(boo2);
    var toStr10 = String(nul);
    var toStr11 = String(udf);
    var toStr12 = String(obj);

    //所有类型转数字
    var toNum1 = Number(str1);
    var toNum2 = Number(str2);
    var toNum3 = Number(boo1);
    var toNum4 = Number(boo2);
    var toNum5 = Number(nul);
    var toNum6 = Number(udf);
    var toNum7 = Number(obj);

    //所有类型转布尔
    var toBol1 = Boolean(str1);
    var toBol2 = Boolean(str2);
    var toBol4 = Boolean(num1);
    var toBol5 = Boolean(num2);
    var toBol6 = Boolean(num3);
    var toBol7 = Boolean(num4);
    var toBol8 = Boolean(num5);
    var toBol9 = Boolean(num6);
    var toBol10 = Boolean(nul);
    var toBol11 = Boolean(udf);
    var toBol12 = Boolean(obj);

    //所有类型转Obj





});