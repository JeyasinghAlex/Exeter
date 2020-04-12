<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match = "@* | node()">
      <xsl:copy>
          <xsl:apply-templates select = "@* | node()"/>
      </xsl:copy>
</xsl:template>

<xsl:template match = "name">
      <nickname>
          <xsl:apply-templates/>
      </nickname>
</xsl:template>

<xsl:template match = "age">
      <year>
          <xsl:apply-templates/>
      </year>
</xsl:template>

<xsl:template match = "village">
      <city>
          <xsl:apply-templates/>
      </city>
</xsl:template>

<xsl:template match = "class">
      <standard>
          <xsl:apply-templates/>
      </standard>
</xsl:template>

<xsl:template match = "student">
      <superman>
          <xsl:apply-templates/>
      </superman>
</xsl:template>

</xsl:stylesheet>