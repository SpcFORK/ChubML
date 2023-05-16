# ChubML

ChubML (Chub Markup Language) is a lightweight markup language designed to simplify the process of creating websites. It provides a simplified syntax that allows for rapid and efficient development.

## Features

- Intuitive Indentation: The indentation in ChubML is used to define the hierarchical structure of elements, making it easy to understand the relationships between parent and child elements.

- Easy Attribute Declaration: Attributes in ChubML are denoted by the '%' symbol. Simply prefix an attribute name with '%' to assign it to an element. For example, `%class=example-class` sets the `class` attribute to `example-class`.

- Data Attributes: ChubML supports data attributes using the '$' symbol. Data attributes are automatically prefixed with 'data-', making it convenient to assign custom data to elements. For example, `$custom-attr=value` sets the `data-custom-attr` attribute to `value`.

- Comments: Comments in ChubML are denoted by the '//' symbol. You can add comments to your code to provide explanations or make notes without affecting the rendering of the webpage.

- Scripts: ChubML supports script inclusion using the '{=' and '=}' delimiters. You can import external scripts by specifying the script's source within the delimiters. For example, `{= src="script.js" =}` imports the script from the 'script.js' file.

- Class and ID: To define classes and IDs in ChubML, use the '.' and '#' symbols, respectively. For example, `div .example-class #unique-id` creates a `div` element with the class `example-class` and the ID `unique-id`.

## Getting Started

To start using ChubML, follow these steps:

1. Create an HTML file and include the ChubML script.
    ```html
      <script src="chubml.js"></script>
    ```

2. Write your web page content using ChubML syntax, defining the structure and attributes of the elements.
    ```chubml
      html;
        head;
          // Add meta tags, title, and external resources here.
        //
        
        body;
          // Add your page content here using ChubML syntax.
          // Indentation and symbols like '.', '#', '%', and '$' will help define the elements.
        //
      //
  
   ```

3. Create a script to execute one of the selection of Chub Functions which can be used to parse a page.

    Here's an example!

    ```chubml
        // var chubLocation = "html"
    
        var chubDev = true
        
        var input = `
        
        html;
          // HEADER
          head;
            meta %charset=utf-8;
            meta %name=viewport %content=width|edevice-width;
            meta %name=msapplication-TileColor %content=#ff8800;
            meta %name=theme-color %content=#ff8800;
            
            title;
              "Chub Syntax! | Home";
            
            link %href=tempPage/style.css %rel=stylesheet %type=text/css;
            
            link %sizes=180x180 %rel=apple-touch-icon %href=tempPage/apple-touch-icon.png;
            link %sizes=32x32 %rel=icon %type=image/png %href=tempPage/favicon-32x32.png;
            link %sizes=16x16 %rel=icon %type=image/png %href=tempPage/favicon-16x16.png;
            link %href=tempPage/site.webmanifest %rel=manifest;
            link %href=tempPage/safari-pinned-tab.svg %rel=mask-icon %color=#ff8800;
          //
          
          // BODY
          body;
            nav;
              div .navHold;
                div .navTitle;
                  h2;
                    "CHUBML - CML";
                span .pipeDiv;
                  "|";
                div .navCont;
                  a .link-url %href=template.js;
                    "Template File";
                  
                  span .pipeDiv;
                    "|";
                    
                  a .link-url %href=style.css;
                    "Template Style";
        
            article .descArticle;
            
            // Sick!
            // So comments work!
            
              h3;
                "Welcome to the";
                span;
                  "CHUB WEBSITE!";
              // 
              
              small;
                "Log by SpectCOW | v.0.0.3";
              // 
              br;
              br;
              hr;
              br;
              
              p;
                "The newest and best Markdown Language simplifier!";
                br;
                "As of '9:30 AM, 2023-05-15', ChubML can build most website features.";
                br;
                
                "It can create";
                span .coolStuffspan;
                  "COOL STUFF really quickly!";
                
                br;
                br;
        
                "It really is better than normal HTML!";
        
                br;
                
                "Due to its quick syntax, you can form tags";
                span .coolStuffspan;
                  "within minutes,";
                
                br;
                
                "allowing you to create websites rapidly and efficently!";
                br;
                br;
                span .coolStuffspan;
                  "And so much more!";
              br;
        
            chub.funnybox;
            // 
        
          {=
            src="temp/test.js"
          =}
          
        `;
        
        var chubstart = () => {
          // injectChub(input)
          ChubRep(input)
        }
        
        var chubinjected = (locationGot) => {
          console.log(locationGot, "lol")
        }
    ```

### Functions.

They are usually sorted in these three prefixes:
- `CHUB`: 
  important, and the main program.
  does not change DOM.
- `chub`:
  Events called after certain Chub operations complete.  
- `Chub`:
  Functions which will usually preform changes or operations on the page.
  It will sometimes come AFTER a word: eg. `injectChub`, but not `ChubRep`.
  Usually calls events like: `chubinjected` or `chubstart`
  
There are `3` functions right now:
- CHUBparse: Turns text into chub.

- injectChub: Injects Formatted Chub into DOM at the variable chublocation if it exists, or a Chub tag. If all else fails, it will replace the body contents.

  - Calls the chubinjected function. 

- ChubRep(doc [[INPUT]], quirky = `"<!DOCTYPE html>"`): replaces the whole document with Chub.

## Examples

Here are a few examples to showcase the ChubML syntax:

  Creating a div element with a class and an ID:

    div .example-class #unique-id
      
Adding a link with a URL and text content:

    a .link-url %href="https://example.com"
      "Visit Example.com"

Defining a script import:

    {= src="script.js" =}

  or:
    
    {= 
      src="script.js" 
    =}

## Contribution

Contributions to ChubML are welcome! If you have any suggestions, improvements, or bug reports, please submit them through the issue tracker or create a pull request on the official GitHub repository.

For more examples and detailed syntax specifications, refer to the official ChubML documentation.