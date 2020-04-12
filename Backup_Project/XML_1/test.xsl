<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
</xsl:template>

<xsl:template match="title">
  <span>
    <xsl:apply-templates/>
  </span>
</xsl:template>

<xsl:template match = "country">
    <abc>
    <xsl:apply-templates/>
    </abc> 
</xsl:template>
</xsl:stylesheet>
