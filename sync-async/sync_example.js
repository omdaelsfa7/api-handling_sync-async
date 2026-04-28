let i = 0;

console.log("Hello A");

function blockCode() {
  while (i < 900900000) {
    i += 1;
  }
  console.log("Middle: While loop finished");
}

blockCode();

console.log("Hello C");