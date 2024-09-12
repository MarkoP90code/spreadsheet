
//window.onload
//document.createElements()
//.className
//Array()                                                     
//Array.from()
//.fill()
//.charCodeAt()
//.fromCharCode()
//Math.ceil() - zaokruzuje na vecu vrednost.
//onchange
//.target
//charAt()
//parseFloat()
//.some()
//.every()
//__________________________________________________________________________
// ******************   SKROZ DOLE JE UKUPNO OBJASNJENJE   ******************
//__________________________________________________________________________

//11. - Step 64. - In mathematics, an infix is a mathematical operator that appears between its two operands. For example, 1 + 2 is an infix expression. To parse these expressions, you will need to map the symbols to relevant functions. Declare an infixToFunction variable, and assign it an empty object.
const infixToFunction = {   //Ovo je objekat ali umesto string ili number, mozemo da zadamo funkciju. Posto +,-,*,/ nije alphanumeric znak moram da ga stavim pod navodnike.
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
};

//12. - Step 68. - Now that you have your infix functions, you need a way to evaluate them. Declare an infixEval function which takes two parameters, str and regex. It should implicitly return the .replace() method of str, with regex and an empty callback as the arguments.
const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));  //@@@@ ispod.

//13. - Step 73. - Now that you can evaluate mathematical expressions, you need to account for order of operations. Declare a highPrecedence function that takes a str parameter.
const highPrecedence = (str) => {     //# ispod.
    const regex = /([\d.]+)([*\/])([\d.]+)/;    //@@@@@ ispod.
    const str2 = infixEval(str, regex);
    return str2 === str ? str : highPrecedence(str2);
  };

//5.
const isEven = (num) => num % 2 === 0;       // ? true : false; ovo je default. Ne moram da pisem.   //Ternary operator.

//4.    Step 20. - Most spreadsheet programs include built-in functions for calculation. Declare a sum function that takes a nums parameter, which will be an array of numbers. It should return the result of calling reduce on the array to sum all of the numbers.
const sum = (nums => nums.reduce((acc, el) => acc + el, 0));         //Ovo sam vec radio. Sumira sve brojeve u array-u. nums zadajem kao ARRAY

//6.    Srednja vrednost.
const average = (nums => sum(nums) / nums.length);

//7.    Ovde slice() sluzi da napravi kopiju array-a. Ima i u wordu i u VS.  Step 23. - Your next function will calculate the median value of an array of numbers. Start by declaring a median arrow function that takes a nums parameter. In the function, declare a sorted variable and assign it the value of sorting a copy of the nums array. You should use the slice() method for creating a shallow copy of the array.
const median = (nums => {   
    const sorted = nums.slice().sort((a, b) => a - b);
    const length = sorted.length;
    const middle = length / 2 - 1;          
    return isEven(length) ? average([sorted[middle], sorted[middle + 1]]) : sorted[Math.ceil(middle)];   //average([sorted[middle], sorted[middle + 1]]) OVDE SU UGLASTE ZAGRADE BITNE JER FUNKCIJA AVERAGE PRIHVATA ARRAY KAO INPUT.   isEven() je u 5. koraku iznad. Ovo mi vraca srednju vrednost dva srednja broja ako je duzina array-a paran broj ili vraca srednji broj ako je duzina arra-a neparna. Ovo Math.celi() zaokruzuje na vecu vrednost.
  })

//8.    Step 26. - Object properties consist of key/value pairs. You can use shorthand property names when declaring an object literal. When using the shorthand property name syntax, the name of the variable becomes the property key and its value the property value.
const spreadsheetFunctions = {      //Ovo je object literal. Skracena verzija objekta. Ima i u wordu. (sum, average, meadian je skraceno jer jel vec ranije zadato)
    sum,
    average,
    median,
    even: nums => nums.filter(isEven),    //Pravi array samo sa parnim brojevima. U . filter sam pozvao isEven (to imam u koraku 5. zadato.)
    firsttwo: nums => nums.slice(0,2),          //Daje dva prva elementa iz array-a.
    lasttwo: nums => nums.slice(nums.length-2),       //Daje dva poslednja elementa iz array-a. Kad u slice zadan jednu vrednost vraca od te vrednosti do kraja array-a po defaultu. Oni su stavili lasttwo: nums => nums.slice(-2), sto znaci da uzima vrednosti od -2 do kraja stringa.
    has2: nums => nums.includes(2),                 //Daje true ako array sadrzi "2" ili false ako ne sadrzi "2".
    increment: nums => nums.map((num) => num + 1),    //Daje array u kome je svaka vrednost veca za jedan od vrednosti u nums.
    someeven: nums => nums.some(isEven),      //.some() proverava da li bar jedan od elemenata zadovoljava uslov i ako bar jedan zadovoljava daje true. U ovom slucaju proverava da li je bar jedan element paran broj.
    everyeven: nums => nums.every(isEven),    //.every() proverava da li svaki element zadovoljava uslov i ako svako zadovoljava vraca true. U ovom slucaju proverava da li je svaki element arra-a paran broj.
    random: nums => nums[0] + Math.round(Math.abs(Math.random() * (nums[1] - nums[0])) + 1 ),    //Daje random broj izmedju prvog i drugog elementa u array-u. Ovde ima neki bag jer svakakva sranja prihvata kao correct. Mislim da je moje dobro. Oni su stavili da je tacno random: ([x, y]) => Math.floor(Math.random() * y + x), sto nema veze s vezom. Testirao sam moje i radi sta treba. Njihovo ne radi sta treba. To je Step 100.
    range: nums => range(nums[0], nums[1]),       //Range ima zadato u koraku 2. Tamo je objasnjeno. Oni su ovako uradili range: nums => range(...nums),.
    nodupes: nums => Array.from(new Set(nums)),     //Izbacuje array sa uklonjenim duplikatima. Oni su ovako uradili nodupes: nums => [...new Set(nums).values()],.
    "": (arg) => arg,     // ### ispod.     Step 103. - Finally, to handle potential edge cases, add an empty string property (you will need to use quotes) which is a function that takes a single argument and returns that argument.
  }

//14. - Step 77. - Now you can start applying your function parsing logic to a string. Declare a function called applyFunction, which takes a str parameter.
const applyFunction = (str) => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix);
  console.log("str2 je " + typeof str2);
  const functionCall = /([a-z]*)\(([0-9., ]*)\)(?!.*\()/i;    //Step 81. - Declare a functionCall variable, and assign it this regular expression: /([a-z]*)\(([0-9., ]*)\)(?!.*\()/i   This expression will look for function calls like sum(1, 4).   Ovo su nam oni dali.
  const toNumberList = (args) => args.split(",").map(parseFloat);     //split rastavlja string na mestima gde je zarez i pravi array (videti na googlu). I onda posto cu dobiti array sa substringovima ["1", "2", "3"] radim map i parseFloat da bi dobio brojeve [1, 2, 3]. map(parseFloat) mogu da uradim ovako posto je parseFloat callback function koju ne moram ja da pravim.
  const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));  //Ovde koristim bracket notation. U spreadsheetFunctions targetujem property key (u ovom slucaju imam sum, average, median i posto je malim slovima zadato zato imam ovo .toLowerCase()). Taj property key ima property value koji je u ovom slucaju funkcija. Zato dodajemo (toNumberList(args)) da bi pozvali funkciju. toNumberList(args) ce izbaciti array npr [1,2,3] i to ce biti input sa sum, average, median.
  return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);    //.hasOwnProperty proverava da li spreadsheetFunctions ima property fn.toLowerCase(). Izbacuje true ili false. I ovde imam ternary operator. Ako je true onda je return apply(fn, args), a ako je false onda je return match.
};

//2.
const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);//* ispod.     Ovde je Array constructor function i moze da se poziva bez reci new (new Array) zato sto je valjda primitive constructor.
// console.log(range(1, 10));

//3. Step 10. - Now that you have a range function, you can use it to create a range of letters as well. Declare a charRange function using const and arrow syntax. It should take a start and end parameter. The function should implicitly return the result of calling range() with start and end as the arguments.
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map((code) => String.fromCharCode(code));//**Ispod.
// console.log(charRange("A", "Z"));

//10.   Step 33. - In order to run your spreadsheet functions, you need to be able to parse and evaluate the input string. This is a great time to use another function.
const evalFormula = (x, cells) => {    //@@@ Ispod objasnjenje za svaki red.
    const idToText = id => cells.find(cell => cell.id === id).value;        //.find() vraca prvi elemenat koji zadovoljava opis. Ovaj deo cells.find(cell => cell.id === id) bi vratio input elemenat ali kad dodam .value vraca vrednost inputa (value).
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;       //**** ispod. 
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));     //parseInt smo stavili za svaki slucaj.
    const elemValue = num => character => idToText(character + num);    //*****
    const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));     //@ ispod.     Zbog ovoga smo dodali .map() - Step 50. -Your addCharacters function ultimately returns a range of characters. You want it to return an array of cell ids. Chain the .map() method to your charRange() call. Do not pass a callback function yet.
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));  //@@ ispod.
    const cellRegex = /[A-J][1-9][0-9]?/gi;
    const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
    // console.log("cellExpanded = " + cellExpanded);
    const functionExpanded = applyFunction(cellExpanded); 
    // console.log("functionExpanded = " + functionExpanded);
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);    //Step 90. - Like you did with your highPrecedence() function, your evalFormula() function needs to ensure it has evaluated and replaced everything.
  }

//1. *** Ispod objasnjenje.
window.onload = () => {         //Valjda ceka da uradi ovo tek kad se sve ocita na stranici (window predstavlja celu stranicu). The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets, scripts, iframes, and images. This is in contrast to DOMContentLoaded, which is fired as soon as the page DOM has been loaded, without waiting for resources to finish loading.
    const container = document.getElementById("container");
    const createLabel = (name) => {
        const label = document.createElement("div");            //.createElement() method allows you to dynamically create new HTML elements.
        label.className = "label";                              //Ima u wordu (ctrl+f setattribute). Ne znam da li sam ovo vidjao. Ovde ce tom elementu biti dodeljena ta klasa. A valjda sa classList.add() mogu da dodam na vec postojece clase. Valjda je to razlika. Mozda sa className moze da se doda vise klasa od jednom. Ima i setAttribute.
        label.textContent = name;
        container.appendChild(label);               //Ubacim label u constainer.
    }
        const letters = charRange("A", "J");
        letters.forEach(createLabel);           //Za svako slovo od A do J poziva createLabel funkciju.
        
        range(1, 99).forEach((number) => {      //Step 15. - Remember that range() returns an array, so you can chain array methods directly to the function call. Call range() with 1 and 99 as the arguments, and chain the .forEach() method. Pass the .forEach() method an empty callback which takes number as the parameter.
            createLabel(number);
            letters.forEach((letter) => {
                const input = document.createElement("input");
                input.type = "text";
                input.id = letter + number;             //Ovde ce ovo letter + number izbaciti obican string, samo nismo stavili "" posto su ovo varijable.
                input.ariaLabel = letter + number;
                input.onchange = update;            //POGLEDATI I U WORDU. Iz 9. koraka ispod. onchange ima na googlu. To je kao da dodaje event listener "change" valjda. update nema () posto valjda kao kad dodajemo event listener u zagradu bi stavili ("change", update). Tu je update reference na funkciju, a ne pozivamo funkciju odma. Nego tek kad se desi onchange.
                container.appendChild(input);
      })
            
        });
  }

//9.    Step 27. - Now you can start using your spreadsheet functions. Begin by declaring an update arrow function. It should take an event parameter.
const update = event => {
    const element = event.target;           //Izbacuje na kom elementu je izvrsen onchange. Ispod imam console.log(). Step 29. - Since your update event is running as a change event listener, the event parameter will be a change event. The target property of the change event represents the element that changed. Assign the target property to a new variable called element.
    // console.log(element);
    const value = element.value.replace(/\s/g, "");         //Ovde je const value jednaka element value ali smo sa ovim .replace(/\s/g, "") zamenili whitespaces(\s)(sto su u stvari razmaci) sa "" (uklanja razmak).
    //console.log(value)
    if (!value.includes(element.id) && value.charAt(0) === "=") {   //Sa ovim !value.includes(element.id) proveravam da li value NE sadrzi (imam ! ispred) element.id. Znaci ako ne sadrzi izbacice to je true, Zaci ako u B1 napisem B1 to je false, ali ako u polje B1 napisem B2 onda je true.  && value.charAt(0) === "=" ovaj deo proverava da li je prvi element "=". Umesto ovoga sam mogao da stavim value.startsWith('='), jeste lepse ali ne radi u Internet Exploreru.
      element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));    //## ispod.
    };
    
    console.log(element);
    console.log(value);
    console.log("element.id = " + element.id);
    console.log("prvi uslov = " + !value.includes(element.id));
    console.log("drugi uslov = " + (value.charAt(0) === "="));
    console.log("prvi i drugi uslov = " + (!value.includes(element.id) && value.charAt(0) === "="));
    console.log(Array.from(document.getElementById("container").children));
}


// ###
// "": (arg) => arg, 
// Primer: u polje A1 napisem 1, u polje A2 napisem 2 u polje A3 napisem 3.
// ako onda zadan u neko polje "=A1:A3" pokazace 1,2,3.
// ako zadam =(A1:A3) pokazace 1,2,3.
// da nemam ovo "": (arg) => arg, u drugom slucaju bi pokazalo (1,2,3).


// ##
// element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
// Ovde pozivam funkciju evalFormula. Prvi parametar je value.slice(1) sto cnaci da ce uzeti vrednost od value ali
// bez clana [0]. Kad stavim slice(1) uzima sve od [1] pa do kraja stringa. Ne uzimam [0] zato sto je u ovom
// slucaju clan [0] znak jednako "=", a to nam ne treba kad zovemo funkciju.
// Drugi parametar je Array.from(document.getElementById("container").children).
// Ovde prvo imam Array.from() jer ce ovo u zagradi dati node list i onda je tako pretvorim u array.
// Ovo u zagradi targetuje svu decu od "container".
//Videcu jos sta ce ovo tacno da radi kad budem testirao.


// #
// const highPrecedence = (str) => {    
//   const regex = /([\d.]+)([*\/])([\d.]+)/;            //Objasnjeno unutar @@@@@
//   const str2 = infixEval(str, regex);                       //Pokrece funkciju infixEval koja za npr. str=2*2 i const regex=/([\d.]+)([*\/])([\d.]+)/; treba da izbaci 4.
//   return str2 === str ? str : highPrecedence(str2);       //Ovde radimo recursive. Objasnjenje ispod (1)
// };
// (1)
// Ako zadam highPrecedence(10) onda sa tim pozivam infixEval(10, regex). Posto regex nece prepoznati 10 znaci
// nece odraditi nikakav replace i str2 ce biti 10. U tom slucaju je str2 === str sto znaci da highPrecedence
// kao rezultat vraca 10. Ako zadam 2*2 ili bolj 2*2*2(da bi bolje skontao) onda se ovo ispod desava.
// Ako pozovem highPrecedence(2*2*2) onda ce str2 = infixEval(2*2*2, regex) = 4*2 jer je regex pronasao
// samo 2*2 i to smo zamenuli sa 4, a sa ovi *2 nista nije menjano tako da je str2=4*2 i to nije jednako
// sa str sto je 2*2*2. Onda opet pozivamo highPrecedence ali ovaj put pozivamo highPrecedence(str2), a
// str2 = 4*2. Znaci sad ce se pozvati infixEval(4*2, regex) i to ce dati rezultat 8. Znaci str2=8.
// Sad pozivamo highPrecedence(8) i posto u ovom slucaju regex ne prepoznaje nista sto bi zamenuo
// znaci da je str2 = 8, sto znaci da je str2 = str i onda za return imamo str sto je 8.


// @@@@@
// /([\d.]+)([*\/])([\d.]+)/
// NE SLAZEM SE SA OVIM JER MISLIM DA MOZE DA BAGUJE ALI EVO OBJASNJENJE. 
// [\d.] - tazi bilo koju cifru \d ili tacku. Tacka inace radi nesto drugo ali posto je ovde zajedno sa 
// characrtrer class \d onda znaci bukvalno da trazi tacku.
// [\d.]+ - ovde plus znaci da trazi ovo u zagradi jednom ili vise puta. Primer ispod:
// Ako imam broj 22.55 onda ce [\d.] naci samo prvu cifru "2", a [\d.]+ ce naci 22.55 jer u prvom krugu trazi
// cifru ili tacku pa nadje "2" pa zbog "+" u drugom krugu trazi cifru ili tacku pa nadje "2" pa u trecem
// kregu trazi cifru ili tacku pa nadje "." itd.
// [*\/] - trazi "*" ili "/". Ovde je ispred "/" potrebno staviti "\" da bi dali do znanja da se trazi
// bukvalno "/". Isto bi trebalo i sa "*" ali mislim da ne mora zato sto je "*" na prvom mestu. U ovom slucaju 
// radi isto i sa [\*\/].



// @@@@ infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));
// Ono sto regex matchuje unutar str zamenjujemo sa vrednosti koju dobijemo kad pozovemo funkciju. Btw regex ce
// matchovati dva broja sa operatorom izmedju njih.
// Za callback imamo funkciju infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)). 
// Sa ovim infixToFunction[operator] smo koristili bracket notation i to ce nam izbaciti funkciju i zato odma
// zadajemo arg1 i arg2. Ali posto su arg1 i arg2 strings, a nema trebaju numbers, radimo parseFloat. 
// Mislim da parseFloat() radi isto kao parseInt() samo sto uzima i ono sto ima posle zareza.
// Nije mi jasno sto su argumenti strings pa moram da ih prebacim u brojeve. Testiracu.
//Ako pozovemo infixEval(2*2, regex), a ovde regex treba da je takav da prepozna 2*2, rezultat bi trebao
//da bude 4.


// @@@
// const evalFormula = (x, cells) => {
//   const idToText = id => cells.find(cell => cell.id === id).value;        //Trazi prvu celiju koja zadovoljava uzlov u zagradi i pokaze njenu vrednost(value).
//   const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;       
//   const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));      //Pravi array [1, 2, 3,...] 
//   const elemValue = num => character => idToText(character + num);          //Pokaze value zadate celije.
//   const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));     //Pravi array [vrednost celije A1, vrednost celije B1, vrednost celije C1,...]
//   const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));  //Menja vrednost rangeRegex unutar rangeRe x sa [Vrednost A1, B1, C1, A2, B2, C2, A3, B3, C3,...].
//   const cellRegex = /[A-J][1-9][0-9]?/gi;
//   const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));    //menja cellRegex unutar rangeExpended sa vrednostima unutar A1, A2...
//   const functionExpanded = applyFunction(cellExpanded);   // cellExpanded pokazuje sta pise u polju A1 npr (moze biti 3 ili 3+2 ili 4*5 ili 6+7*8) i sa tim ce applyFunction da radi dalje sta treba. Moram jos da vidim sta se zadaje. Izgleda nije tesko ali je zakukuljeno dobro.
// }



// @@
// const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
// Ovde radimo replace Matchovanog stringa (unutar rangeRegex) u x vrednosti. Replace vrednost ne mora da 
// bude string, u ovom slucaju
// koristimo callback funkciju tako da ce vrednost te funkcije da zameni matchovani string.
// Imamo parametar za svaki capture group (ima ih 4, ono sto je u zagradama) unutar rangeRegex.  Imamo char1,
// num1, cha2, num2, a ovo match za sada ne koristimo.
// Zatim pozivamo rangeFromString(num1, num2) funkciju i na nju vezujemo .map ali za callback prosledjujemo 
// funkciju i morali smo proslediti char1 i char2, a num ce da prosledi map posto map poziva funkciju i za
// num ubacuje vrednosti iz rangeFromString(num1, num2)(to ce biti array).
// Ispred match smo dodali donju crtu jer ga za sada ne koristimo, mogli smo ostaviti i prazno 
// mesto npr ovako (, char1).

// @
// const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));
// Ovde sa charRange pravim array sa slovima od A-J recimo ali posto funkcija addCharacters zahteva i num onda
// se funkcija nece izvrsiti dok ne zadamo i num. 
// Dodajemo .map() ali za callback prosledjujemo funkciju. Primer ispod:

// const myFunc = (val) => `value: ${val}`;
// const array = [1, 2, 3];
// const newArray = array.map(myFunc);
// izbacuje [value: 1, value: 2, value: 3]
// Znaci map poziva funkciju tako sto zadaje redom vrednosti iz array i pravi novi array [value: 1, value: 2, value: 3].

// Posto u mom slucaju imam currying da sam zadao samo .map(elemValue) onda bi rezultat bio array izpunjan
// da function references. Zato zadajem .map(elemValue(num)) i onda ostaje samo krajnja funkcija da se izvrsi 
// tj funcija character => idToText(character + num);.  Mislim da u .map(elemValue(num)) nije moralo da bude num
// nego smo tako izabrali.
// map poziva ovu finkciju tako sto ubacuje vredosti iz napravljenog arraya.
// Npr da sam addCharacters("A")("C")(1) prvo bi se napravio array od A - C a onda bi u prvoj iteraciji 
// prosledili "A" u funkciju chatacter i dobili "A1", pa bi prosledili "B" pa onda "C".
// Znaci addCharacters("A")("C")(1) bi trebao da izbaci ["A1", "B1", "C1"]. Provericu jos.



// *****
// Ovo je komplikovaniji nacim. I na izgled je komplikovano, a i omamo dodatnu const inner.
// const elemValue = num => {
//     const inner = character => {
//         return idToText(character + num);
//     }
//     return inner;
// }

// Ovo je laksi nacin
// const elemValue = num => character => idToText(character + num); 



// ****
// Ovde je () capturing group. Valjda pronalazi i PAMTI sve od A - J i posle toga broj od 1 - 99. Valjda u 
// array stavlja. I sa zagradama smo napravili podgrupacije koje trazimo.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences.
// /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi/  ovde ([A-J]) pronalazi slova od A-J, ([1-9][0-9]?) pronalazi broj 
// gde je prva cifra od 1-9, a druga od 0-9 i druga cifra je optional, to je upitnik "?". Onda imam ":" sto i
// znaci dve tacke i onda opet isto ovo posto treba da trazi npr A1:B20. I na kraju "g" je global, a "i" je
// case insensitive. 




//  ***
//  window.onload = () => {            //Cim otvorimo stranicu ucitava funkciju. Ne moramo da je pozovemo.     
//     const container = document.getElementById("container");         //targetujem container
//     const createLabel = (name) => {                                 //pravimo element sa ovom funkcijom, u ovom slucaju "div".
//         const label = document.createElement("div");                //pravi div       
//         label.className = "label";                                  //daje class-u div-u.
//         label.textContent = name;                                   //dodeljuje text.
//         container.appendChild(label);                               //ubacuje label u container. BITNO, BEZ OVOGA SE NECE POJAVITI NA STRANICI.
//     }
//         const letters = charRange("A", "J");                        //pravi array sa slovima od A do J.
//         letters.forEach(createLabel);                               //za svako slovo poziva createLabel funkciju i pravi div-ove.
        
//         range(1, 99).forEach((number) => {                          //range(1, 99) pravi array sa vrednostima od 1 do 99 i onda radi ovo ispod za svaki clan array-a.
//             createLabel(number);                                    //pravi div za svaki broj. U prvoj iteraciji pravi prvi div sa tekstom "1", zatim nastavlja da izvrsava funkciju do kraja pa onda sve ponovo za svaki broj.
//             letters.forEach((letter) => {                           //ova funkcija za svako slovo pravi input elemenat. Znaci iznad sa createLabel(number) smo napravili prvi div pa onda za taj prvo div pravi input za svako slovo. Pa onda u drugoj iteraciji u redu iznad se napravi drugi div pa se onda ovde pravi input za svako slovo i tako za svaki broj ubacuje za svako slovo input.
//                 const input = document.createElement("input");      //pravi input element.
//                 input.type = "text";                                //daje type inputu. Word(ctrl+f setAttribute).
//                 input.id = letter + number;                         //daje id inputu. A1, A2,...
//                 input.ariaLabel = letter + number;                  //daje isti aria-label.
//                 container.appendChild(input);                       //BITNO. DODAJE INPUT U CONTAINER. BEZ OVOGA SE NECE POJAVITI NA STRANICI.
//       })
            
//         });
//   } 



// **
// Ovde za start i end zadajem slova. Npr charRange("A", "Z"). (mada mogu i brojeve ali mora biti string "")
// Posto range funkcija ocekuje brojeve onda slova pretvaramo u broj pomocu .charCodeAt(). Unutar zagrade
// stavljam index. U nasem slucaju smo stavili 0 ali to je i po defaultu ako ostavimo praznu zagradu.
// Za nas slucaj kad pozovem charRange("A", "Z") ond je start.charCodeAt(0) = 65 zato sto je to kod 
// za veliko "A", a (0) znaci uzimamo slovo na nultom mestu. Kod za "Z" end.charCodeAt(0) = 90.
// Znaci charRange("A", "Z") ce izbaciti array sa brojevima za svako slovo od A do Z (malo a i z imaju 
// drugaciji kod). Izbacice array sa brojevima od 65 do 90.
// DA POJASNIM:
// Da sam uradio ovo
// const charRange = (start, end) => range(start.charCodeAt(2), end.charCodeAt(5));
// charRange("HlAdno", "Vrucazima") onda bi izbacio array sa brojevima od 65 do 122 jer je kod 
// za malo "z" 122. Od tih 65 do 122 kad uradim console.log() ce biti i neki kodovi koji nisu slova
// kao npr "^", "_", "`". Bitno je da kod za prvo slovo koje uzimam bude manji od koda za drugo slovo jer u
// range imam ovo Array(end - start + 1), a array ne moze da ima negativan broj clanova.
// Na to smo nadovezali .map((code) => String.fromCharCode(code) i to vraca brojeve u slova.



// *
// Array je constructor function (ima u wordu). U ovom slucaju ovo u zagradi (end - start + 1) ce da bude
// neki broj (jedan broj) i kad u Array zadamo jedan broj to ce u stvari biti length tog array-a.
// Ovde ima objasnjenje sta sve moze da se zada u zagradi. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array 
// .fill() sluzi da popuni array https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
// STA OVO SVE RADI:   radim primer start = 1, end = 10.
// const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);
//     Array(end - start + 1) - pravi array duzine 10-1+1 (objasnjavam za start=1, end=10). Ovo ce napraviti array
// sa 10-1+1=10 praznih mesta.
//     .fill(start) - puni tih deset praznih mesta sa vrednosti start, znaci pravi array sa 10 jedinica.
//     .map((element, index) => element + index) - pravi novi array i popunjava elemente na osnovu pozvane
// funkcije. Znaci u prvoj iteraciji pravi prvi element array-a (pozicija [0]), 
// element=1 index=0, element + index = 1.
// U drugoj iteraciji element=1, index=1, element + index = 2 (znaci na poziciji [1] je 2).
// U poslednjoj iteraciji element=1, index=9, element + index = 10 (znaci na poziciji [9] je 10).\
// ZNACI AKO URADIM console.log(range(1, 10)); IZBACICE [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].





//_______________________________________________________________________________________
//_______________________________________________________________________________________
//_______________________________________________________________________________________



//   Ako u polju zadam =A1:B3 sledece se desava:
//   Kada zadam ovo i stisnem enter ili kliknem negde pokrece se funkcija update. Pokrene se zato sto
//   imam zadato input.onchange = update; (update je reference posto je bez (). Pokrene se tek kad se
//   desi onchange. Unutar funkcije ovo se desava:

//   const element = event.target;  Ovde je element ono na cemu se desila izmena, ako uradim console.log()
//   pokazace npr <input type="text" id="C4" aria-label="C4">.

//   const value = element.value.replace(/\s/g, "");  Value je ono sto pise u polju (npr "=A1:A5"). I ovde
//   je uradjen replace da se izbace razmaci. Npr ako napisem "=   A  1: A 5" value ce biti "=A1:A5".

//   if (!value.includes(element.id) && value.startsWith('=')) {
//     element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
//   } Ovde if ima uslov da ono sto napisemo u polju NE sadrzi (imam na pocetku "!") id od tog polja i da
//   ono sto napisem pocinje sa "=". Znaci ako npr u polju D3 napisem =A1:B3 to je ok jer id od polja D3 je "D3"
//   tako da A1:B3 ne sadrzi taj id. Ako u polje A1 napisem =A1:B3 onda nece radidi jer je id od polja A1 = "A1".
//   Ako u A2 napisem =A1:B3 onda ce da radi ali ispise neku nebulozu (ovo mislim da je bag).
//   Znaci ako su oba uslova u if zadovoljena onda element.value dobijamo tako sto pokrenemo funkciju evalFormula.
//   U nasem slucaju posto smo u polju napisali "=A1:B3" onda je prvi clan u evalFormula, value.slice(1) u stvari
//   A1:B3. Ovde smo uradili slice(1) sto znaci uzima sve osim prvog elementa sto je "=".
//   drugi clan je Array.from(document.getElementById("container").children) sto je array sa svim children
//   elementima koji su unutar container-a.

//   Znaci pokrece se funkcija evalFormula(A1:B3, array sa svim children elementima).
//   Unutar funkcije prvih pet redova objasnjava sta ce se desavati. Ali tek u sestom redu pocinje nesto.

//   const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
//   Ovde je const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi; sto znaci da trazi
//   "slobo broj : slovo broj" (npr A3:D20). Imam negde objasnjenje sta tacno radi.
//   Posto imam capturing groups, to su ove () zagrade npr ([A-J]) onda vidim da imam cetiri grupe.
//   Unutar zagrade imam (_match, char1, num1, char2, num2), ovde treba da znam kako radi kad za replace vrednost
//   koristim funkciju. Ima ovde https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
//   Prvi clan je match i on je jednak celom izrazu sto nadje (A1:B3) i to mi ne treba zato stavljamo "_" ispred
//   sto znaci da taj clan ne koristimo. Drugi clan je char1 i to je A. num1 = 1, char2 = B, num2 = 3.
//   Ovo su vrednosti iz capturing group-A.
//   Sa tim vrednostima poziva se rangeFromString(num1, num2) sto ce biti rangeFromString(1, 3).
//   Ova funkcija poziva funkciju range(parseInt(num1), parseInt(num2)) sto ce biti 
//   range(parseInt(1), parseInt(3)) sto ce dati array [1, 2, 3]. Ovde mislim da nije bilo potrebe da se 
//   radi parseInt. Tako dobijamo i rangeFromString(1, 3) da je [1, 2, 3]. Razlika izmedju 
//   rangeFromString i range je samo sto smo parseInt dodali.

//   Na to nadovezujemo .map(addCharacters(char1)(char2)). Tj .map(addCharacters("A")("B"))
//   const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));
//   Ovde charRange(character1, character2) tj. charRange("A", "B") pravi array ["A", "B"] i onda za
//   zadato num elemValue(num) se poziva ovo const elemValue = num => character => idToText(character + num);
//   Posto je num zadato onda nam treba jos character, a to se zadaje ovde 
//   charRange(character1, character2).map(elemValue(num)) pomocu map. U prvoj iteraciji se ubacuje num=1,
//   a map uzima A iz charRange i sa tim se poziva idToText("A1"), a idToText izbaci vrednost polja "A1".
//   U drugoj iteraciji num=1 pa se ubacuje "B" idToText("B1") daje vrednost u "B1".
//   Tako konacan produkt bude ["vrednost u A1", "vrednost u B1"]


//   Posto je kod mene rangeFromString(1, 3) = [1, 2, 3] onda kad radim .map(addCharacters("A")("B"))
//   desava se to u prvoj iteraciji se ubacuje 1 u elemValue(num) pa se dobije ["vrednost u A1", "vrednost u B1"],
//   u drugoj iteraciji se ubaci da je num 2 sto pravi ["vrednost u A2", "vrednost u B2"] i u trecoj 
//   se ubaci num = 3 sto pravi ["vrednost u A3", "vrednost u B3"] tako da je konacni proizvod
//   ["vrednost u A1", "vrednost u B1", "vrednost u A2", "vrednost u B2", "vrednost u A3", "vrednost u B3"].
//   Znaci za zadato =A1:B3, rangeExpanded ce zamenuti to sa 
//   ["vrednost u A1", "vrednost u B1", "vrednost u A2", "vrednost u B2", "vrednost u A3", "vrednost u B3"].

//   Posle toga imam:
//   const cellRegex = /[A-J][1-9][0-9]?/gi;
//   const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
//   Ovo je za slucaj da je zadato zamo npr =A1.
//   Onda posto rangeExpanded nece naci nista sto moze da uradi replaze izbacice A1 i onda se sa tim poziva
//   idToText sto ce dati "vrednost u A1". 
//   Ovde ima kako replace u ovom slucaju radi i sto se match automatcki uzima (trazi Specifying a function as the replacement na ovoj adresi) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace 
//   Ovde smo uradili toUpperCase() sto znaci da prihvata i =A1 i =a1.

//   to smo mogli i ovde uraditi const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
//   tako sto bi uradili ovo .map(addCharacters(char1.toUpperCase())(char2.toUpperCase())).

//   Sledece radim:
//   const functionExpanded = applyFunction(cellExpanded);
//   U slucaju da je u polju zadato =A1 ili aj da radim primer =A1:B3 onda je 
//   cellExpanded = ["vrednost u A1", "vrednost u B1", "vrednost u A2", "vrednost u B2", "vrednost u A3", "vrednost u B3"].
//   Aj da zadam da su te vrednosti npr [1, 2, 3, 4, 5, 6].
//   Znaci imacu applyFunction(1, 2, 3, 4, 5, 6) i onda idu sledeci koraci:

//   const noHigh = highPrecedence(str);       //Ova funkcija trazi da uradi mnozenje ili deljenje ali posto nemam to vraca 1, 2, 3, 4, 5, 6
//   const infix = /([\d.]+)([+-])([\d.]+)/;
//   const str2 = infixEval(noHigh, infix);    //Ova funkcija trazi da uradi sabiranje ili oduzimanje ali posto nemam to vraca 1, 2, 3, 4, 5, 6
//   const functionCall = /([a-z]*)\(([0-9., ]*)\)(?!.*\()/i;          //sum, average, median. Ako zadam u polje =sum(1,4) ovo trazi sum(1,4). Ako zadam =(1,4) naci ce (1,4).Ako zadam =() i tu ce naci () ali krajnju rezultat ce biti NaN i cak praznu zagradu ().
//   const toNumberList = args => args.split(",").map(parseFloat);
//   const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
//   return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
//   OVDE JE BITNO DA U RETURN OVAJ TERNARU OPERATOR SE NE ODNOSI NA RETURN NEGO NA CALLBACK FUNKCIJU POSTO JE U ZAGRADI U REPLACE.
//   ZNACI AKO NEMAM NIKAKAV MATCH VRACA str2.

//   posto je cellExpanded = "1,2,3,4,5,6" i ovo highPrecedence i infixEval ne radi nista u ovom slucaju
//   onda ce return biti str2.

//   Onda smo dosli do ovoga:
//   return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
//   posto sam u polje napisao =A1:A3 znaci da je x="A1:A3", a functionExpanded smo dobili da je u ovom slucaju
//   str2 sto je "1,2,3,4,5,6" onda znaci da "1,2,3,4,5,6" nije === "A1:A3" sto znaci da se pokrece 
//   evalFormula(functionExpanded, cells). To je recursion.
//   U ovoj iteraciji zadajemo da je x = functionExpanded sto je u stvari "1,2,3,4,5,6".
//   Kad se sve ovo ponovo uradi 1,2,3,4,5,6 ce samo protrcati kroz sve formula jer nema sta da matchuje i
//   dobija se da je functionExpanded = "1,2,3,4,5,6" sto je u ovom slucaju isto sto i x sto znaci da ovde
//   return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells); imamo true
//   i u polju nam ispisuje 1,2,3,4,5,6.


  
//   Ima vise opcija sta smo mogli na pocetku napisati:
//   =A1:B3                //Ovo sam objasnio
//   =C5                   //Ovo je slicno i to sam donekle objasnio
//   =A1+A2                //Ovde ce cellRegex naci A1 i A2 i zamenuti ih sa vrednostima u tim poljima nakon cega ce infixEval da radi i kad dobijemo vrednost zbira onda ne bi trebalo da je problem sta se dalje desava.
//   =1,2,3                //Ovo se ni sa cim ne matchuje tako da je functionExpanded === x i izbaci nam to isto.
//   =a,b,c                //Ovo radi kao prethodno.
//   =sum(A1:A3)           //U ovom slucaju ce imati na cemu da se uradi replace pa treba ispratiti sta se dedava   return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
//   =average(1,3)         //Slicno kao prethodno.
//   =nekaFunkcija(1,3)    //sum i average i jos neke imam zadato, a ova funkcija "nekaFunkcija" nije zadata tako da i pored toga sto ce ovde naci match    return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match); ne ispunjava ovaj uslov .hasOwnProperty() tako da vraca onda match. Znaci kad zadam u polje =nekaFunkcija(1,3) ispidace to isto "nekaFunkcija(1,3)".
//   =(A1:A3)              //Ovo je ovaj slucaj "": (arg) => arg, (gore je zadato). *Ispod pojasnio.
//   =1+2+3*4*5            //Ovo ce da koristi highPrecedence i infixEval. highPrecedence ima recursion u slucaju da imam 3*4*5 u prvom krugu dobijam 12*5, a u drugom 60. i onda radi InfixEval i sabira. I sabiranje ce se raditi opet kad ima potrebe jer cu ovde uraditi prvo 1+2 samo sto ce mi dati 3+60 pa onda functionExpanded === x (3+60 nije === 1+2+3*4*5) sto znaci da opet radimo pa cemo dobiti (63 nije === 3+60) i onda u trecem krugu dobijamo (63 === 63) i to se ispisuje u polju.

// //*
// // "": (arg) => arg, 
// // Primer: u polje A1 napisem 1, u polje A2 napisem 2 u polje A3 napisem 3.
// // ako onda zadan u neko polje "=A1:A3" pokazace 1,2,3.
// // ako zadam =(A1:A3) pokazace 1,2,3.
// // da nemam ovo "": (arg) => arg, u drugom slucaju bi pokazalo (1,2,3).