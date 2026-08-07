console.log("TRAIN AREA!");

/* MITASK-Z
Shunday function yozing, uni sonlardan tashkil topgan array qabul qilsin.
Function arraydagi juft sonlarni yigindisini qaytarsin.
MASALAN: sumEvens([1,2,3]) return 2.
*/
function sumEvens(param: number[]) {
  let sum: number = 0;

  for (let i = 0; i < param.length; i++) {
    if (param[i] % 2 === 0) {
      sum += param[i];
    }
  }
  return sum;
}
const result1 = sumEvens([1, 2, 3]);
console.log(result1);
const result2 = sumEvens([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(result2);

/* MITASK-Y
Shunday function yozing, uni 2 ta array parapetri bolsin.
Function ikkala arrayda ham ishtirok etgan qiymatlarni bir arrayda qaytarsin.
MASALAN: findIntersection([1,2,3], [3,2,0]) return [2,3].
*/
/*
function findIntersection(param1: any[], param2: any[]) {
  const result: any[] = [];

  for (let i = 0; i < param1.length; i++) {
    if (param2.includes(param1[i])) {
      result.push(param1[i]);
    }
  }
  return result;
}
const result1 = findIntersection([1, 2, 3], [3, 2, 0]);
console.log(result1);

const result2 = findIntersection([1, "a", 3], [3, "a", 0]);
console.log(result2);
*/

/* X-TASK
Shunday function yozing, uni object va string parapetrlari bolsin.
Function string parametri object ichida necha marotaba takrorlanganligini qaytarsin
(nested object bolsa ham sanasin).
MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2.
*/
/*
function countOccurrences(param1: any, param2: string): number {
  let count = 0;
  if (typeof param1 === "object" && param1 !== null) {
    for (const key in param1) {
      if (key === param2) {
        count++;
      }

      if (typeof param1[key] === "object" && param1[key] !== null) {
        count += countOccurrences(param1[key], param2);
      }
    }
  }
  return count;
}

const result1 = countOccurrences(
  { model: "Bugatti", steer: { model: "HANKOOK", size: 30 } },
  "model",
);
console.log(result1);

const result2 = countOccurrences(
  {
    seoul: "capital",
    korea: { seoul: "big city", programming: { seoul: "gangnam" } },
  },
  "seoul",
);
console.log(result2);
*/

/* Shunday function yozing, uni array va number parametrlari bolsin.
Function arrayni numberda berilgan uzunlikda kesib bolaklarga ajratilgan array holatida qaytarsin.
MASALAN: chunkArray([1,2,3,4,5,6,7,8,9,10], 3) return [[1,2,3], [4,5,6], [7,8,9], [10]].
*/
/*
function chunkArray(param1: number[], param2: number) {
  let result: number[][] = [];
  let part: number[] = [];

  for (let i = 0; i < param1.length; i++) {
    part.push(param1[i]);

    if (part.length === param2 || i === param1.length - 1) {
      result.push(part);

      part = [];
    }
  }
  return result;
}
const result1 = chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
console.log(result1);

const result2 = chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4);
console.log(result2);
*/

/* V-TASK
Shunday function yozing, uni string parametri bolsin
va stringdagi harf va u harf necha marta takrorlangani sonidan tashkil topgan object qaytarsin.
MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}.
*/
/*
function countChars(param: string) {
  let obj: { [key: string]: number } = {};
  for (let i = 0; i < param.length; i++) {
    const letter = param[i];

    if (obj[letter]) {
      obj[letter] += 1;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}
const result1 = countChars("hello");
console.log(result1);
const result2 = countChars("ashgabat");
console.log(result2);
*/

/* U-TASK
Shunday function yozing, uni number parametri bolsin
va 0 dan berilgan parametrgacha bolgan oraliqdagi faqat toq sonlar nechtaligini return qilsin
MASALAN: sumOdds(9) return 4; sumOdds(11) return 5.
*/
/*
function sumOdds(params: number): number {
  let odds: number = 0;

  for (let i = 0; i < params; i++) {
    if (i % 2 !== 0) {
      odds += 1;
    }
  }
  return odds;
}

const result1 = sumOdds(9);
console.log(result1);
const result2 = sumOdds(11);
console.log(result2);
*/

/* T-TASK
Shunday function yozing, u sonlardan tashkil topgan 2 ta array qabul qilsin
a ikkala arraydagi sonlarni tartiblab bir arrayda qaytarsin.
MASALAN: mergeSortedArrays([0,3,4,31], [4,6,30]) return [0,3,4,4,6,30,31].
*/
/*
function mergeSortedArrays(params1: number[], params2: number[]) {
  const mergedArray = [...params1, ...params2];
  return mergedArray.sort((a, b) => a - b);
}
const result1 = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
console.log(result1);
const result2 = mergeSortedArrays([0, 50, 2, 1], [85, 98, 250]);
console.log(result2);
*/

/* S-TASK
Shunday function yozing, u numberlardan tashkil topgan array qabul qilsin
va osha numberlar orasidagi tushib qolgan sonni topib uni return qilsin.
MASALAN: missingNumber([3, 0, 1]) return 2.
*/
/*
function missingNumber(params: number[]) {
  const sorted = params.sort((a, b) => a - b);

  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i] + 1 !== sorted[i + 1]) {
      return sorted[i] + 1;
    }
  }
  return "All right, no missing number";
}
const result1 = missingNumber([3, 0, 1]);
console.log(result1);
const result2 = missingNumber([8, 6, 9]);
console.log(result2);
const result3 = missingNumber([8, 7, 9]);
console.log(result3);
const result4 = missingNumber([10, 12, 11]);
console.log(result4);
*/
/* R-TASK
Shunday function yozing, u string parametrga ega bolsin.
String "1+2" holatda pass qilinganda string ichidagi sonlar yigindisini number holatda qaytarsin.
MASALAN: calculate("1+3") return 4.
*/
/*
function calculate(params: string): number {
  const numbers = params.match(/\d+/g);
  if (!numbers) return 0;

  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += Number(numbers[i]);
  }
  return total;
}
const result1 = calculate("1+3");
console.log(result1);
const result2 = calculate("1+*7+5b5");
console.log(result2);
*/

/* Q-TASK
Shunday function yozing,
u 2 ta parametrgga ega bolib birinchisi object, ikkinchisi string.
Agar string parametr objectni propertysi bolsa true bolmasa false qaytarsin.
MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") return true;
MASALAN: hasProperty({name: "BMW", model: "M3"}, "year") return false.
*/
// 1.option
/*
function hasProperty1(param1: { [key: string]: any }, param2: string) {
  for (let key in param1) {
    if (key === param2) {
      return true;
    }
  }
  return false;
}
const result1 = hasProperty1({ name: "BMW", model: "M3" }, "model");
console.log(result1);
const result2 = hasProperty1({ name: "BMW", model: "M3" }, "year");
console.log(result2);

console.log("======");

// 2.option
function hasProperty2(param1: { [key: string]: any }, param2: string): boolean {
  return param2 in param1;
}
const result3 = hasProperty2({ name: "BMW", model: "M3" }, "model");
console.log(result3);
const result4 = hasProperty2({ name: "BMW", model: "M3" }, "year");
console.log(result4);
*/

/* P-TASK
Shunday function yozing, u object qabul qilsin
va arrayni object arrayga otkazib arrayni qaytarsin.
MASALAN: objectToArray({a: 10, b: 20}) return [["a", 10], ["b", 20]].
*/
/*
function objectToArray(params: { [key: string]: any }) {
  let result = [];
  for (let key in params) {
    result.push([key, params[key]]);
  }
  return result;
}
const result1 = objectToArray({ a: 10, b: 20 });
console.log(result1);
const result2 = objectToArray({ KR: 82, TM: 993 });
console.log(result2);
*/

/* O-TASk
Shunday function yozing, u har xil valuelardan iborat array qabul qilsin
va array ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin.
MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45.
*/
/*
function calculateSumOfNumbers(params: any[]) {
  let sum: number = 0;
  for (let i = 0; i < params.length; i++) {
    if (typeof params[i] === "number") {
      sum += params[i];
    }
  }
  return sum;
}
const result1 = calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]);
console.log(result1);
const result2 = calculateSumOfNumbers(["10", { son: 10 }, true, "MIT-5", 100]);
console.log(result2);
*/

/* N-TASK
Shunday function yozing, u string qabul qilsin
va string palindrom yani togri oqilganda ham, orqasidan oqilganda
ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin.
MASALAN: palindromCheck("dad") return true; palindromCheck("son") return false.
*/
/*
function palindromCheck(params: string) {
  const paramsArray = params.split("");
  let reverse: string[] = [];
  for (let i = 0; i < paramsArray.length; i++) {
    reverse.unshift(paramsArray[i]);
    reverse;
  }
  const revereString = reverse.join("");
  if (params === revereString) {
    return true;
  } else {
    return false;
  }
}
const result1 = palindromCheck("dad");
console.log(result1);

const result2 = palindromCheck("son");
console.log(result2);

const result3 = palindromCheck("mom");
console.log(result3);
*/

/* M-TASK
Shunday function yozing,
u raqamlardan tashkil topgan array qabul qilsin
a array ichidagi har bir raqam uchun raqamni ozi va hamda osha raqamni kvadratidan tashkil topgan object hosil qilib,
hosil bolgan objectlarni array ichida qaytarsin.
MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}].
*/
/*
function getSquareNumbers(params: number[]) {
  if (!params.every((num) => typeof num === "number")) {
    return "ERROR, write only numbers";
  }
  const square = params.map((number) => {
    return { number: number, square: number * number };
  });
  return square;
}
const result1 = getSquareNumbers([1, 2, 3]);
console.log(result1);

const result2 = getSquareNumbers([10, 20, 30]);
console.log(result2);
*/

/* L-TASK
Shunday function yozing,
u string qabul qilsin
va string ichidagi hamma sozlarni chappasiga yozib va sozlar ketma-ketligini buzmasdan stringni qaytarsin.
MASALAN: reverseSentence("we like coding!") return "ew ekil gnidoc".
*/
/*
function reverseSentence(a: string): string {
  const a_array = a.split(" ");

  const reverse_a_array = a_array.map((word) => {
    return word.split("").reverse().join("");
  });
  return reverse_a_array.join(" ");
}

const result1 = reverseSentence("we like coding");
console.log(result1);

const result2 = reverseSentence("Software Engineer");
console.log(result2);
*/
