/// <reference types="node" />
export declare const fixtures: {
    description: string;
    input: {
        addInputs: {
            hash: string;
            index: number;
        }[];
        addOutputs: {
            script: Buffer;
            value: Buffer;
            asset: Buffer;
            nonce: Buffer;
        }[];
        updateInputData: {
            witnessUtxo: {
                script: Buffer;
                value: Buffer;
                nonce: Buffer;
                asset: Buffer;
            };
            sighashType: number;
        }[];
        updateOutputData: {
            redeemScript: Buffer;
        }[];
    };
    expectedBeforeUpdate: string;
    expectedAfterUpdate: string;
}[];
