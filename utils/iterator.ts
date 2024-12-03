
/**
implements iterator for object to be used in for of loop
or just add a [Symbol.iterator] method to the object

yield => returns a value and pauses the generator function
next => returns an object with a value and done property
done => true if the generator has completed

*/


Object.prototype[Symbol.iterator] = function*(){
	for(const key in this){
		yield [key,this[key]];
	}
}
const [a,b] = {
	a:3,
	b:4,
	[Symbol.iterator](){
		const keys = Object.keys(this);
		let i = 0;
		return {
			next:()=>{
				if(i<keys.length){
					return {value:this[keys[i++]],done:false};
				}else{
					return {done:true};
				}
			}
		}
	}
}


console.log(a,b);
console.log('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator')
