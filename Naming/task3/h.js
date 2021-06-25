class H {
    static main() {
        const L = 1000; // limit the seq of Harshad numbers
        for (let i = 1; i <= L; i++) {
            if (i % H.loop(i) === 0) {
                console.log(i);
            }
        }
    }

    static loop(N) {
        let S = 0;
        while (N > 0) {
            let D = N % 10;
            S += D;
            N = (N - D) / 10;
        }
        return S;
    }
}

H.main();
