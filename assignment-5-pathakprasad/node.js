/*
  Author:     Prasad A. Pathak
  NEU ID:     002925486
  Email:      pathak.pra@northeastern.edu
  Subject:    INFO6150 - Web Design and UX
  Purpose:    Assignment 5 - Implement Tree Search 
*/

// Creating arrays to use them as stack to store data while searching
answer = []; 
nodeStack = [];
nodeStackTemp = [];

/*
* A Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, classes, ids ,children) {
    // Tag name of the node.
    this.tag = tag;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of CSS id names
    this.ids = ids;
    // Array of child nodes.
    this.children = children; // All children are of type Node
  }

  /**
  * Returns descendent nodes matching the selector. Selector can be 
  * a tag name or a CSS class name.
  * 
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes. 
  * @public
  */

  search (selector) {

  if(selector === undefined) {
    throw 'Incorrect Input. Search Input cannot be null!';
  }

  nodeStack.push(this.tag);
  nodeStackTemp.push(this.tag);

  if (this.children !== []) {
    // console.log(`Visiting ${element.tag}`);
    this.children.forEach(el => {
      
      //This is a class selector
      if (selector.includes(".")) {
        
        el.classes.forEach(cl => {
          if (cl === selector.split(".")[1]) {
            // answer.push(el.ids[0]); //Append ID of the matching tag
            answer.push(el); //Append Node of the matching tag
          }
        });
        
      }
      //This is a nested tag selector
      else if (selector.includes(" ")) {
        let parentTag = selector.split(" ")[0];
        let childTag = selector.split(" ")[1];

        let stackTop = nodeStackTemp.pop();
        nodeStackTemp.push(stackTop);

        // console.log(nodeStackTemp);

        if(parentTag === stackTop & childTag === el.tag) {
          // answer.push(el.ids); //Append ID of the matching tag
          answer.push(el); //Append Node of the matching tag
        }

      }
      //This is a basic tag selector
      else {
        
        if (el.tag === selector) {
          // answer.push(el.ids); //Append ID of the matching tag
          answer.push(el); //Append Node of the matching tag
        }
      }
      el.search(selector);
    });
    nodeStackTemp.pop();
    }
    return answer;
  }
}

// Example 1
// * <div> 
// *   <span id="span-1"></span>
// *   <span id="span-2"></span>
// *   <div>
// *     <span id="span-3"></span>
// *   </div>
// * </div>
// * Selector `span` should return 3 span nodes in this order
// * span-1 -> span-2 -> span-3.

// let span1 = new Node('span',[],['span-1'],[]);
// let span2 = new Node('span',[],['span-2'],[]);
// let span3 = new Node('span',[],['span-3'],[]);
// let childDiv = new Node('div',[],[],[span3]);
// let article1 = new Node('article',[],[],[childDiv]);
// let root = new Node('div',[],[],[span1,span2,article1]);
// root.search('span');


// Example 2
// * <div> 
// *   <span id="span-1" class="note"></span>
// *   <span id="span-2"></span>
// *   <div>
// *     <span id="span-3"></span>
// *   </div>
// * </div>
// * Selector `.note` should return one span node with `note` class.

// let span1 =new Node('span',['note'],['span1'],[]);
// let span2 =new Node('span',[],['span1'],[]);
// let span3 =new Node('span',[],['span3'],[]);
// let childDiv =new Node('div',[],[],[span3]);
// let root = new Node('div',[],[],[span1,span2,childDiv]);
// root.search('.note');

//Example 3
// * <div> 
// *   <span id="span-1"></span>
// *   <span id="span-2"></span>
// *   <article>
// *     <div>
// *       <span id="span-3"></span>
// *     </div>
// *   </article>
// * </div>
// * Selector `div span` should return three span nodes in this order
// * span-1 -> span-2 -> span-3.

// let span1 = new Node('span',[],['span-1'],[]);
// let span2 = new Node('span',[],['span-2'],[]);
// let span3 = new Node('span',[],['span-3'],[]);
// let childDiv = new Node('div',[],[],[span3]);
// let article1 = new Node('article',[],[],[childDiv]);
// let root = new Node('div',[],[],[span1,span2,article1]);
// root.search('.note');


/* Test Case DOM -
  <body id="content">
  <div id="div-1" class="mainContainer">
  <span id="span-1" class="note"></span>
  <span id="span-2"></span>
  <div id="div-2" class="subContainer1">
  <p id="para-1" class="sub1-p1 note"></p>
  <span id="span-3" class="sub1-span3"></span>
  </div>
  <div id="div-3" class="subContainer2">
  <section id="sec-1">
  <label id="lbl-1"></label>
  </section>
  </div>
  <div id="div-4">
  <span id="span-4" class="mania"></span>
  <span id="span-5" class="note mania"></span>
  </div>
  </div>
  <span id="span-6" class="randomSpan"></span>
  </body>
*/
let span5 = new Node('span',['note', 'mania'],['span-5'],[]);
let span4 = new Node('span',['mania'],['span-4'],[]);
let div4 = new Node('div',[],['div-4'],[span4,span5]);
let label1 = new Node('label',[],['lbl-1'],[]);
let section1 = new Node('section',[],['sec-1'],[label1]);
let div3 = new Node('div',['subContainer2'],['div-3'],[section1]);
let span3 = new Node('span',['sub-1-span3'],['span-3'],[]);
let para1 = new Node('p',['sub1-p1','note'],['para-1'],[]);
let div2 = new Node('div',['subContainer1'],['div-2'],[para1,span3]);
let span2 = new Node('span',[],['span-2'],[]);
let span1 = new Node('span',['note'],['span-1'],[]);
let div1 = new Node('div',['mainContainer'],['div-1'],[span1,span2,div2,div3,div4]);
let span6 = new Node('span',['randomSpan'],['span-6'],[]);
let root = new Node('body',[],['content'],[div1,span6]);

//Test Case 1
answer = [];
console.log(`Test Case 1 : `);
console.log(div1.search('span'));

// //Test Case 2
answer = [];
console.log(`Test Case 2 : `);
console.log(div1.search('.note'));

// //Test Case 3
answer = [];
console.log(`Test Case 3 : `);
console.log(div1.search('label'));

// //Test Case 4
answer = [];
console.log(`Test Case 4 : `); 
console.log(para1.search('.note'));

// //Test Case 5
answer = [];
console.log(`Test Case 5 : `); 
console.log(div1.search('div'));

// //Test Case 6
answer = [];
console.log(`Test Case 6 :`);
console.log(span6.search('div'));

// //Test Case 7
answer = [];
console.log(`Test Case 7 : `);
console.log(div2.search('section'));

try {
  //Test Case 8
  answer = [];
  console.log(`Test Case 8 : `);
  console.log(root.search());
} catch (e){
  console.log(`Error : ${e}`);
}

// //Test Case 9
answer = [];
console.log(`Test Case 9 : `);
console.log(root.search('section'));

// //Test Case 10
answer = [];
console.log(`Test Case 10 : `);
console.log(div1.search('.randomSpan'));










