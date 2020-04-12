<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
  <body>
    <h2>Table Formation</h2>
    <table border="1">
      <tr bgcolor="#9acd32">
        <th>title</th>
        <th>artist</th>
        <th>country</th>
        <th>company</th>
        <th>price</th>
        <th>year</th>
      </tr>
            <xsl:for-each select = "catalog/cd">
                <xsl:if test = "price &gt; 9">
                <!--xsl:if test = "title/@id  > 10">
                <xsl:if test = "year &lt; 1980">
                <xsl:if test = "country = 'uk'">
                <xsl:sort select = "year"/-->
      <tr>
            <td><xsl:value-of select = "title"/></td>
            <td><xsl:value-of select = "artist"/></td>
            <td><xsl:value-of select = "country"/></td>
            <td><xsl:value-of select = "company"/></td>
            <td><xsl:value-of select = "price"/></td>
            <td><xsl:value-of select = "year"/></td>
      </tr>
      </xsl:if>
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>
