let i = 0;

console.log("Hello A");

async function codeBlock() {
  await new Promise((resolve) => {
    setTimeout(() => {
      while (i < 900000000) {
        i += 1;
      }
      console.log("Middle: While loop finished");
      resolve();
    }, 0);
  });
}

codeBlock();

console.log("Hello C");