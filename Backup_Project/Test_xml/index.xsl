<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match = "@* | node()">
      <xsl:copy>
          <xsl:apply-templates select = "@* | node()"/>
      </xsl:copy>
</xsl:template>


<xsl:template match = "catalog">
    <div class = "catalog">
        <xsl:apply-templates/>
    </div>
</xsl:template>

<xsl:template match = "cd">
       <p>
          <xsl:attribute name = "class">cd</xsl:attribute>
          <xsl:apply-templates/>  
      </p>
</xsl:template>

<xsl:template match = "title">     
    <span>    
            <!--xsl:attribute name = "id">
                <xsl:value-of select = "concat('td', @id)"/>
            </xsl:attribute-->

            <xsl:variable name = "varName" select = "@id"/>
            <xsl:attribute name = "data-id">
                 <xsl:value-of select = "concat('td', $varName)"/>        
            </xsl:attribute>

            <xsl:apply-templates/>
    </span>
</xsl:template>

<xsl:template match = "artist">     
       <span>
            <xsl:apply-templates/>
      </span>
</xsl:template>

<xsl:template match = "country">     
       <span>
          <xsl:apply-templates/>
      </span>
</xsl:template>

<xsl:template match = "company">     
       <span>
          <xsl:apply-templates/>
      </span>
</xsl:template>

<xsl:template match = "price">     
       <span>
          <xsl:apply-templates/>
      </span>
</xsl:template>

<xsl:template match = "year"/>


</xsl:stylesheet>