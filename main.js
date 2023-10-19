const fs = require('fs');
const fastXmlParser = require('fast-xml-parser');
const http = require('http');
 
const hostname = '127.0.0.1';
const port = 8000;



const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    fs.readFile('data.xml', 'utf-8', (err, data) => {
        if (err) {
          console.error('Error reading the XML file:', err);
          return;
        }
      const parser = new fastXmlParser.XMLParser()
        try {
          // Parse the XML
          const options = {
            attributeNamePrefix: "@_",
            attrNodeName: false,
            textNodeName: "#text",
            ignoreAttributes: false,
            ignoreNameSpace: false,
            parseNodeValue: true,
            parseAttributeValue: true,
            trimValues: true,
            parseTrueNumberOnly: false,
          };
      
          const result = parser.parse(data, options);
        
          const builder = new fastXmlParser.XMLBuilder();
    

      const filtered = result.indicators.inflation.filter(v => v.ku == 13 && v.value > 5);

        
        const values = [];
        for (const i of filtered) {
            values.push(i['value']);
        }
        const newObj = builder.build({'data': {'value' : values } } );
        console.log(newObj);

         res.end(newObj);
        
        } catch (parseErr) {
          console.error('Error parsing XML:', parseErr);
        }
      });



    //res.end(newObj);
   

  });
 
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });