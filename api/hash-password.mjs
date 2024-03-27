import bcrypt from 'bcrypt';

if (process.argv.length < 3) {
    throw new Error("Provide a password to hash");
}

const cleartextpass = process.argv[2];

console.log(cleartextpass);

const hash = await bcrypt.hash(cleartextpass, 10);

console.log(hash);
