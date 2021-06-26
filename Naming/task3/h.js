class Harshad {
  static MAGIC_NUMBER_TEN = 10;

  static showHarshadNumbers() {
    const limitNumbers = 1000;

    for (let number = 1; number <= limitNumbers; number++) {
      if (number % Harshad.loop(number) === 0) {
        console.log(number);
      }
    }
  }

  static loop(number) {
    let sum = 0;

    while (number > 0) {
      sum += number % Harshad.MAGIC_NUMBER_TEN;

      number = number / Harshad.MAGIC_NUMBER_TEN;
    }

    return sum;
  }
}

Harshad.showHarshadNumbers();
