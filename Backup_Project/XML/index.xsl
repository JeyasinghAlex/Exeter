
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


<xsl:template match = "/">
<html>
<body>
    <h2>Hi I am Alex Sparrow</h2>
    <table border = "1">
        <tr bgcolor = "green">
            <th>name</th>
            <th>village</th>
        </tr>
        <xsl:for-each select = "school/student">
         <tr>
            <td>
                <xsl:attribute name="id" select="/@id"/>
              <xsl:value-of select = "name"/></td>
            <td>
               <xsl:attribute name="id" select="/@id"/>
            <xsl:variable name="id" select="text/@id"/>
              <xsl:value-of select = "village"/></td>
          </tr>
           
                
        </xsl:for-each>

        <xsl:for-each select = "school/student/name">
          <tr>
              <td><xsl:value-of select = "name"></td>
              <td><xsl:value-of selcet = "age"></td>
        </xsl:for-each>
    </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>

      

