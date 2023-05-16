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

3. Save the HTML file and open it in a web browser. The ChubML script will parse the ChubML code and render it as HTML.

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