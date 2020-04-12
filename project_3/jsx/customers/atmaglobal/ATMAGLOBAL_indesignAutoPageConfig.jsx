var config = {
    "defaultUnits":"pt",
    "baseLeading":15,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":false,
    "applyTableBorderWidth":1,
    "applyTableBorderColor":'',
	"calcParaBoundsForStages": {
    "Pre-editing": true,
    "Typesetter QA": true,
    "Author proof": true,
    "Author revision": true,
    "Revises": true,
    "Copyediting": true,
    "Copyediting Check": true,
    "Typesetter Check": true,
    "Publisher Check": true,
    "Author Review": true,
    "Publisher Review": true,
    "Author Revision": true
    },
    "pageSize":{
        "width":432,
        "height":648
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":6
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":6
            },
         "toc":{
            "print":{
                "crop_marks":true, 
                "bleed_marks":false, 
                "registration_marks":false, 
                "colour_bars":false, 
                "page_information":false,
                "offset":6
                },
            "online":{
                "crop_marks":true, 
                "bleed_marks":false, 
                "registration_marks":false, 
                "colour_bars":false, 
                "page_information":false,
                "offset":6
                }
            }
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[66,40.5,600,391.5
    ],
    "geoBoundsRecto":[66,472.5,600,823.5
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "INDEX":"LAYOUT4",
    "TITLE":"LAYOUT3",
    "HFTE":"LAYOUT2",
    "FTMT":"LAYOUT1",
    "INTRODUCTION":"LAYOUT1",
    "COPYRIGHT":"LAYOUT1",
    "DEDICATION":"LAYOUT2",
    "ACKNOWLEDGEMENTS":"LAYOUT1",
    "APPENDIX":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":351, "height":515,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":351, "height":533,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":84,
                "bottom":49.9,
                "inside":40.5,
                "outside":40.5
                },
            "otherPageMargin":{
                 "top":66,
                "bottom":49,
                "inside":40.5,
                "outside":40.5
                }
            },
        "LAYOUT2":{        
            "openerPageColumnDetails":[
                  {"width":351, "height":384.234,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":351, "height":533,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":213.866,
                "bottom":49.9,
                "inside":40.5,
                "outside":40.5
                },
            "otherPageMargin":{
                 "top":66,
                "bottom":49,
                "inside":40.5,
                "outside":40.5
                }
            },
        "LAYOUT3":{        
            "openerPageColumnDetails":[
                  {"width":351, "height":478.147,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":351, "height":533,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":119.953,
                "bottom":49.9,
                "inside":40.5,
                "outside":40.5
                },
            "otherPageMargin":{
                 "top":66,
                "bottom":49,
                "inside":40.5,
                "outside":40.5
                }
            },
        "LAYOUT4":{        
            "openerPageColumnDetails":[
                  {"width":351, "height":515,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":351, "height":533,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":84,
                "bottom":49.9,
                "inside":40.5,
                "outside":40.5
                },
            "otherPageMargin":{
                 "top":66,
                "bottom":49,
                "inside":40.5,
                "outside":40.5
                }
            }
        },
    "jrnlBoxBlock":{
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":'top'
        },
        "KEY_BACK":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":false,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":263.25, 
      "horizontalCenter":true
    },
    "resizeImage":{
      "allow":false,
      "modifyLimit":0
    },
    "figCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
    "tblCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
"continuedStyle":{
    "table":{
      "footer": {
        "continuedText": "(<i>(Continued)</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
        "continuedText":"Table [ID].[emsp](<i>Cont.</i>)",
        "space-below": 0,
        "repeat-header": true,
        "repeat-sub-header": false,
        "tableLastRowStyle": "TBLR",
        "tableHeadRowStyle": "TCH",
        "tableContinuedStyle": "TBL_ContHead",
        "tableLabelStyle": "tblLabel"
        }
    },
    "figure":{
      "footer": {
        "repeatLabel":false,
        "continuedText": "(continued)",
        "continuedTextStyle": "FIG_Cont",
        "figureBottomDefaultGap": 8
        },
      "header": {
        "repeatLabel":true,
        "continuedText":" Continued",
        "spaceBelow": 8,
        "figureContinuedStyle": "FIG_ContHead"
            }
        }
      },
    "adjustParagraphSpaceStyleList":{
        "increase":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T,EQN-B,EQN",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-T,EQN-B,EQN"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T,EQN-B,EQN",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-T,EQN-B,EQN"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4,jrnlHead5",
        "limitationPercentage":[6,9,12]
        },
    "adjustFloatsSpace":{
        "limitationPercentage":{
            "minimum":[30,35,40],
            "maximum":[60,70,80]
            }        
    },
    "trackingLimit":{
        "minimum":15,
        "maximum":15
    },
    "nonDefaultLayers":["PRIM_SUR"],
    
    "docFontsList":[
       {
          "Adobe Garamond Pro": {
            "Roman": {
                "Symbol (T1)": "Regular"
              },
            "Italic": {
                "Symbol (T1)": "Italic"
              },
            "Bold": {
                "Symbol (T1)": "Bold"
              },
            "Bold Italic": {
                "Symbol (T1)": "Bold"
              }
          }
      },
      
          {
          "Symbol (T1)": {
            "Regular": {
                "Arial Unicode MS": "Regular"
              },
                "Italic": {
                    "Arial Unicode MS": "Regular"
              },
                "Bold": {
                    "Arial Unicode MS": "Regular"
            }
          }
        }
    ],
    
   "replFonts":[
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Regular"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Italic"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Bold"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Bold Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
          {"xpath" : "//div[@class='jrnlCVBR']", "frame-name":"CVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBL']", "frame-name":"CVBR", "action":"move", "styleOverride":null},
          {"xpath" : "//p[@pstyle='jrnlTitle']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
          {"xpath" : "//p[@pstyle='jrnlTRTR_jrnlArtTitle']", "frame-name":"TRTR", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlCorrespBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null}
       ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,95,24,6"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"98,0,0,15"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"40,42,115"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,142,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"34,34,33"
                    }
                }            
            },
         "FTMT":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,95,24,6"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"98,0,0,15"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"40,42,115"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,142,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"34,34,33"
                    }
                }            
            },
         "INDEX":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,95,24,6"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"98,0,0,15"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"40,42,115"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,142,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"34,34,33"
                    }
                }            
            },
         "TITLE":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,95,24,6"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"98,0,0,15"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"40,42,115"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,142,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"34,34,33"
                    }
                }            
            },
         "HFTE":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,95,24,6"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"98,0,0,15"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"40,42,115"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,142,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"34,34,33"
                    }
                }            
            },
         "INTRODUCTION":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,95,24,6"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"98,0,0,15"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"40,42,115"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,142,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"34,34,33"
                    }
                }            
            },
         "COPYRIGHT":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,95,24,6"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"98,0,0,15"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"40,42,115"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,142,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"34,34,33"
                    }
                }            
            },
         "DEDICATION":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,95,24,6"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"98,0,0,15"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"40,42,115"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,142,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"34,34,33"
                    }
                }            
            },
         "ACKNOWLEDGEMENTS":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,95,24,6"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"98,0,0,15"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"40,42,115"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,142,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"34,34,33"
                    }
                }            
            },
         "APPENDIX":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,95,24,6"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"98,0,0,15"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"40,42,115"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,142,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"34,34,33"
                    }
                }            
            }
        },
        "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "12px",
                    "font-family" : "'AdobeGaramondPro', AdobeGaramondPro"
                },
                "fontPath"  : "AdobeGaramondPro/AdobeGaramondPro.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'AdobeGaramondProBold',AdobeGaramondProBold'",
                    "font-size" : "12px",
                    "line-height" : "15px",
                    "padding" : "6px 6px 6px 6px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'AdobeGaramondProRegular', AdobeGaramondProRegular",
                    "font-size" : "12px",
                    "line-height" : "15px",
                    "padding" : "6px 6px 6px 6px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "351pt"
              },
              "font" : {
                  "size"    : "12pt",
                  "ledding" : "15pt",
                  "path"    : "/AdobeGaramondPro/",
                  "ext"     : "otf",
                  "bold"    : "AdobeGaramondProBold",
                  "italic"  : "AdobeGaramondProItalic",
                  "bold_italic":"AdobeGaramondProBoldItalic",
                  "main"    : "AdobeGaramondProRegular"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "351pt"
              },
              "font" : {
                "size"    : "12pt",
                "ledding" : "15pt",
                "path"    : "/AdobeGaramondPro/",
                "ext"     : "otf",
                    "bold"    : "AdobeGaramondProBold",
                  "italic"  : "AdobeGaramondProItalic",
                  "bold_italic":"AdobeGaramondProBoldItalic",
                  "main"    : "AdobeGaramondProRegular"
              }
           }
        },
    "stubColObj":{
        "top": {
            "STUB_COLUMN": false,
            "STUB_STMT": false
        },
        "bottom": {
            "METAINFO": true,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": true
        }
    },
    "tocDetails":{   
       "singlePageToc": false,
       "maximumTocFrameHeight":515,
        "tocAdjustParagraphSpaceStyleList":{
            "increase":{
                "before":"jrnlArticleType",
                "after":"jrnlAuthors"
            },
            "softBreak":["jrnlArtTitle"],                
            "limitationPercentage":{
                "minimum":40,
                "maximum":60
            },
            "pointSizeModify":{                
                "maximum":0.5
            }
        },
       "fontFamily":{
           "AdobeGaramondPro":{  
              "Regular":{  
                 "roman":"Regular",
                 "bold":"Bold",
                 "italic":"Italic",
                 "bolditalic":"Bold Italic"
              },
              "Bold":{  
                 "italic":"Bold Italic",
                 "bolditalic":"Bold Italic"
              },
              "Italic":{  
                 "bold":"Bold Italic",
                 "bolditalic":"Bold Italic"
              },
              "BoldItalic":{  
                 "italic":"Bold Cond Italic",
                 "bolditalic":"Bold Cond Italic"
              }
           },
        "TimesNewRoman":{  
              "Regular":{  
                 "roman":"Regular",
                 "bold":"Bold",
                 "italic":"Italic",
                 "bolditalic":"Bold Italic"
              },
              "Bold":{  
                 "italic":"Bold Italic",
                 "bolditalic":"Bold Italic"
              },
              "Italic":{  
                 "bold":"Bold Italic",
                 "bolditalic":"Bold Italic"
              },
              "BoldItalic":{  
                 "italic":"Bold Cond Italic",
                 "bolditalic":"Bold Cond Italic"
              }
           }
        }
    }
}