; ModuleID = 'Flec'
source_filename = "Flec"

@0 = private unnamed_addr constant [27 x i8] c"Enter the number of terms:\00", align 1
@fmtstr = private unnamed_addr constant [4 x i8] c"%s\0A\00", align 1
@1 = private unnamed_addr constant [3 x i8] c"%d\00", align 1
@2 = private unnamed_addr constant [13 x i8] c"You entered:\00", align 1
@fmtstr.1 = private unnamed_addr constant [4 x i8] c"%s\0A\00", align 1
@fmtint = private unnamed_addr constant [4 x i8] c"%d\0A\00", align 1
@3 = private unnamed_addr constant [25 x i8] c"Enter a float value (z):\00", align 1
@fmtstr.2 = private unnamed_addr constant [4 x i8] c"%s\0A\00", align 1
@4 = private unnamed_addr constant [3 x i8] c"%f\00", align 1
@5 = private unnamed_addr constant [15 x i8] c"You entered z:\00", align 1
@fmtstr.3 = private unnamed_addr constant [4 x i8] c"%s\0A\00", align 1
@fmtfloat = private unnamed_addr constant [4 x i8] c"%f\0A\00", align 1
@6 = private unnamed_addr constant [11 x i8] c"Updated z:\00", align 1
@fmtstr.4 = private unnamed_addr constant [4 x i8] c"%s\0A\00", align 1
@fmtfloat.5 = private unnamed_addr constant [4 x i8] c"%f\0A\00", align 1
@7 = private unnamed_addr constant [20 x i8] c"Fibonacci sequence:\00", align 1
@fmtstr.6 = private unnamed_addr constant [4 x i8] c"%s\0A\00", align 1
@fmtint.7 = private unnamed_addr constant [4 x i8] c"%d\0A\00", align 1
@8 = private unnamed_addr constant [6 x i8] c"Done.\00", align 1
@fmtstr.8 = private unnamed_addr constant [4 x i8] c"%s\0A\00", align 1

define i32 @main() {
entry:
  %printcall = call i32 (ptr, ...) @printf(ptr @fmtstr, ptr @0)
  %n = alloca i32, align 4
  %0 = call i32 (ptr, ...) @scanf(ptr @1, ptr %n)
  %printcall1 = call i32 (ptr, ...) @printf(ptr @fmtstr.1, ptr @2)
  %n2 = load i32, ptr %n, align 4
  %printcall3 = call i32 (ptr, ...) @printf(ptr @fmtint, i32 %n2)
  %printcall4 = call i32 (ptr, ...) @printf(ptr @fmtstr.2, ptr @3)
  %z = alloca float, align 4
  %1 = call i32 (ptr, ...) @scanf(ptr @4, ptr %z)
  %printcall5 = call i32 (ptr, ...) @printf(ptr @fmtstr.3, ptr @5)
  %z6 = load float, ptr %z, align 4
  %floatToDouble = fpext float %z6 to double
  %printcall7 = call i32 (ptr, ...) @printf(ptr @fmtfloat, double %floatToDouble)
  store float 4.500000e+00, ptr %z, align 4
  %printcall8 = call i32 (ptr, ...) @printf(ptr @fmtstr.4, ptr @6)
  %z9 = load float, ptr %z, align 4
  %floatToDouble10 = fpext float %z9 to double
  %printcall11 = call i32 (ptr, ...) @printf(ptr @fmtfloat.5, double %floatToDouble10)
  %printcall12 = call i32 (ptr, ...) @printf(ptr @fmtstr.6, ptr @7)
  %a = alloca i32, align 4
  store i32 0, ptr %a, align 4
  %b = alloca i32, align 4
  store i32 1, ptr %b, align 4
  %count = alloca i32, align 4
  store i32 0, ptr %count, align 4
  br label %loop

loop:                                             ; preds = %loopcond, %entry
  %a13 = load i32, ptr %a, align 4
  %printcall14 = call i32 (ptr, ...) @printf(ptr @fmtint.7, i32 %a13)
  %temp = alloca i32, align 4
  %a15 = load i32, ptr %a, align 4
  %b16 = load i32, ptr %b, align 4
  %addtmp = add i32 %a15, %b16
  store i32 %addtmp, ptr %temp, align 4
  %b17 = load i32, ptr %b, align 4
  store i32 %b17, ptr %a, align 4
  %temp18 = load i32, ptr %temp, align 4
  store i32 %temp18, ptr %b, align 4
  %count19 = load i32, ptr %count, align 4
  %addtmp20 = add i32 %count19, 1
  store i32 %addtmp20, ptr %count, align 4
  %count21 = load i32, ptr %count, align 4
  %eqtmp = icmp eq i32 %count21, 7
  %ifcond = icmp ne i1 %eqtmp, false
  br i1 %ifcond, label %then, label %else

loopcond:                                         ; preds = %ifcont
  %count22 = load i32, ptr %count, align 4
  %n23 = load i32, ptr %n, align 4
  %lttmp = icmp slt i32 %count22, %n23
  %loopcond24 = icmp ne i1 %lttmp, false
  br i1 %loopcond24, label %loop, label %afterloop

afterloop:                                        ; preds = %loopcond, %then
  %printcall25 = call i32 (ptr, ...) @printf(ptr @fmtstr.8, ptr @8)
  ret i32 0

then:                                             ; preds = %loop
  br label %afterloop
  br label %ifcont

else:                                             ; preds = %loop
  br label %ifcont

ifcont:                                           ; preds = %else, %then
  br label %loopcond
}

declare i32 @printf(ptr, ...)

declare i32 @scanf(ptr, ...)
