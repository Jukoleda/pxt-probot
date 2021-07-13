namespace probots {

    interface Weights {
        i1_h1: number,
        i2_h1: number,
        i3_h1: number,
        bias_h1: number,
        i1_h2: number,
        i2_h2: number,
        i3_h2: number,
        bias_h2: number,
        i1_h3: number,
        i2_h3: number,
        i3_h3: number,
        bias_h3: number,
        h1_o1: number,
        h2_o1: number,
        h3_o1: number,
        bias_o1: number
    }

    interface Dataset {
        input: Array<number>,
        output: number
    }

    class ColorRec {
        constructor() {
            this.pesos.i1_h1 = Math.random();
            this.pesos.i2_h1 = Math.random();
            this.pesos.i3_h1 = Math.random();
            this.pesos.bias_h1 = Math.random();
            this.pesos.i1_h2 = Math.random();
            this.pesos.i2_h2 = Math.random();
            this.pesos.i3_h2 = Math.random();
            this.pesos.bias_h2 = Math.random();
            this.pesos.i1_h3 = Math.random();
            this.pesos.i2_h3 = Math.random();
            this.pesos.i3_h3 = Math.random();
            this.pesos.bias_h3 = Math.random();
            this.pesos.h1_o1 = Math.random();
            this.pesos.h2_o1 = Math.random();
            this.pesos.h3_o1 = Math.random();
            this.pesos.bias_o1 = Math.random();
        }

        sigmoid (x: number) { return 1 / (1 + Math.exp(-x)) };
        _sigmoid(x: number) { return this.sigmoid(x) * (1 - this.sigmoid(x)) };

        pesos: Weights;
        data: Dataset[];
        predict(i1: number, i2: number, i3: number) {
            let h1_inputs =
                this.pesos.i1_h1 * i1 +
                this.pesos.i2_h1 * i2 +
                this.pesos.i3_h1 * i3 +
                this.pesos.bias_h1;

            let h1 = this.sigmoid(h1_inputs);

            let h2_inputs =
                this.pesos.i1_h2 * i1 +
                this.pesos.i2_h2 * i2 +
                this.pesos.i3_h2 * i3 +
                this.pesos.bias_h2;

            let h2 = this.sigmoid(h2_inputs);

            let h3_inputs =
                this.pesos.i1_h3 * i1 +
                this.pesos.i2_h3 * i2 +
                this.pesos.i3_h3 * i3 +
                this.pesos.bias_h3;

            let h3 = this.sigmoid(h3_inputs);

            let o1_inputs =
                this.pesos.h1_o1 * h1 +
                this.pesos.h2_o1 * h2 +
                this.pesos.h3_o1 * h3 +
                this.pesos.bias_o1;

            let o1 = this.sigmoid(o1_inputs);


            return o1;
        }

        train() {
            let weight_deltas: Weights;

            for(let i = 0; i < this.data.length; i++){
                let i1 = this.data[i].input[0],
                    i2 = this.data[i].input[1],
                    i3 = this.data[i].input[3],
                    output = this.data[i].output;

                let h1_inputs =
                    this.pesos.i1_h1 * i1 +
                    this.pesos.i2_h1 * i2 +
                    this.pesos.i3_h1 * i3 +
                    this.pesos.bias_h1;

                let h1 = this.sigmoid(h1_inputs);

                let h2_inputs =
                    this.pesos.i1_h2 * i1 +
                    this.pesos.i2_h2 * i2 +
                    this.pesos.i3_h2 * i3 +
                    this.pesos.bias_h2;

                let h2 = this.sigmoid(h2_inputs);

                let h3_inputs =
                    this.pesos.i1_h3 * i1 +
                    this.pesos.i2_h3 * i2 +
                    this.pesos.i3_h3 * i3 +
                    this.pesos.bias_h3;

                let h3 = this.sigmoid(h3_inputs);

                let o1_inputs =
                    this.pesos.h1_o1 * h1 +
                    this.pesos.h2_o1 * h2 +
                    this.pesos.h3_o1 * h3 +
                    this.pesos.bias_o1;

                let o1 = this.sigmoid(o1_inputs);

                let delta = output - o1;
                let o1_delta = delta * this._sigmoid(o1_inputs);

                weight_deltas.h1_o1 += h1 * o1_delta;
                weight_deltas.h2_o1 += h2 * o1_delta;
                weight_deltas.h3_o1 += h3 * o1_delta;
                weight_deltas.bias_o1 += o1_delta;

                let h1_delta = o1_delta * this._sigmoid(h1_inputs);
                let h2_delta = o1_delta * this._sigmoid(h2_inputs);
                let h3_delta = o1_delta * this._sigmoid(h3_inputs);

                weight_deltas.i1_h1 += i1 * h1_delta;
                weight_deltas.i2_h1 += i2 * h1_delta;
                weight_deltas.i3_h1 += i3 * h1_delta;
                weight_deltas.bias_h1 += h1_delta;

                weight_deltas.i1_h2 += i1 * h2_delta;
                weight_deltas.i2_h2 += i2 * h2_delta;
                weight_deltas.i3_h2 += i3 * h2_delta;
                weight_deltas.bias_h2 += h2_delta;

                weight_deltas.i1_h3 += i1 * h3_delta;
                weight_deltas.i2_h3 += i2 * h3_delta;
                weight_deltas.i3_h3 += i3 * h3_delta;
                weight_deltas.bias_h3 += h3_delta;

            }

            this.pesos.i1_h1 += weight_deltas.i1_h1;
            this.pesos.i2_h1 += weight_deltas.i2_h1;
            this.pesos.i3_h1 += weight_deltas.i3_h1;
            this.pesos.bias_h1 += weight_deltas.bias_h1;
            this.pesos.i1_h2 += weight_deltas.i1_h2;
            this.pesos.i2_h2 += weight_deltas.i2_h2;
            this.pesos.i3_h2 += weight_deltas.i3_h2;
            this.pesos.bias_h2 += weight_deltas.bias_h2;
            this.pesos.i1_h3 += weight_deltas.i1_h3;
            this.pesos.i2_h3 += weight_deltas.i2_h3;
            this.pesos.i3_h3 += weight_deltas.i3_h3;
            this.pesos.bias_h3 += weight_deltas.bias_h3;
            this.pesos.h1_o1 += weight_deltas.h1_o1;
            this.pesos.h2_o1 += weight_deltas.h2_o1;
            this.pesos.h3_o1 += weight_deltas.h3_o1;
            this.pesos.bias_o1 += weight_deltas.bias_o1;

            

        }

        outputResults(){

            this.data.forEach(({ input: [i1, i2, i3], output: y }) =>
                console.log(`[R:${i1}, G:${i2}, B:${i3}] => ${this.predict(i1, i2, i3)} (expected ${y})`));
        }

        show() {
            console.log(this.pesos);
            this.outputResults();
        }

        run(times = 1, debug = true) {
            for (let i = 0; i < times; i++) {
                this.train();
            }
        }
    }
}
