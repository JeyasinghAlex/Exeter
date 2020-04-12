var config = {
    "defaultUnits":"pt",
    "baseLeading":11,
    "preferredPlaceColumn":0,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "minNoLinesOnPag":3,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":584.957,
        "height":782.986
    },
    "wrapAroundFloat":{
      "top":24,
      "bottom":24,
      "left":24,
      "right":24,
      "gutter":24
    },
    "geoBoundsVerso":[49.5,40.5,740.200787401574,554.775590551181
    ],
    "geoBoundsRecto":[49.5,636.775590551181,740.200787401574,1148.85118110236
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "AIAA":"LAYOUT1",
    "JAT":"LAYOUT1",
    "JTHT":"LAYOUT2"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
                "openerPageColumnDetails":[
                  {"width":239.979, "height":691.789,"floatsCited":false,"gutter":0},
                  {"width":239.979, "height":691.789,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":239.979, "height":707.486,"floatsCited":false,"gutter":0},
                  {"width":239.979, "height":707.486,"floatsCited":false,"gutter":24}
                ],
                 "openerPageMargin":{
                    "top":65.197,
                    "bottom":26,
                    "inside":40.5,
                    "outside":40.5
                },
            "otherPageMargin":{
                "top":49.5,
                "bottom":26,
                "inside":40.5,
                "outside":40.5
                }
            },
         "LAYOUT2":{
                "openerPageColumnDetails":[
                  {"width":239.979, "height":691.789,"floatsCited":false,"gutter":0},
                  {"width":239.979, "height":691.789,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":239.979, "height":707.486,"floatsCited":false,"gutter":0},
                  {"width":239.979, "height":707.486,"floatsCited":false,"gutter":24}
                ],
                 "openerPageMargin":{
                    "top":65.197,
                    "bottom":26,
                    "inside":40.5,
                    "outside":40.5
                },
            "otherPageMargin":{
                "top":49.5,
                "bottom":26,
                "inside":40.5,
                "outside":40.5
                }
            }
        },
  "jrnlBoxBlock":{//these objects are for overriding actual floats placement 
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":'top'
        },
        "KEY_BACK":{
            "calcCitationHeight":true,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":true,//if this is true then the landscape float could be placed in landscape single column
      "twoThirdColumnStyle":false,//if this is true then the landscape float could be placed in landscape two third column
      "twoThirdWidth":342.8, 
      "horizontalCenter":true//if this is true float could be center horizontally after rotated
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
        "continuedText": "(<i>Continued</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
//~         "continuedText":"Table [ID]. [CAPTION][ensp](<i>Continued</i>)",
        "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
        "space-below": 0,
        "repeat-header": true,
        "repeat-sub-header": false,
        "tableLastRowStyle": "TBLR",
        "tableHeadRowStyle": "TCH",
        "tableContinuedStyle": "TBL_ContHead",
        "tableLabelStyle": "tblLabel"
        }
    }
  },
    "adjustParagraphSpaceStyleList":{
        "increase":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "limitationPercentage":{
            "minimum":40,
            "maximum":80
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsPara,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4,jrnlHead5"
        },
    "adjustFloatsSpace":{
        "limitationPercentage":{
            "minimum":30,
            "maximum":60
            }        
    },
    "trackingLimit":{
        "minimum":15,
        "maximum":15
    },
    "nonDefaultLayers":["THANK"
    ],
    
    "docFontsList":[
       {
          "ITC New Baskerville": {
            "Roman": {
                "Symbol": "Medium"
              },
            "Italic": {
                "Symbol": "Italic"
              },
            "Bold": {
                "Symbol": "Bold"
              }
          }
      },
        {
          "Helvetica Neue LT Std (OTF)": {
            "55 Roman": {
                "ITC Zapf Dingbats": "Medium"
            }
          }
      },
        {
          "Myriad Pro": {
            "Regular": {
                "ITC Zapf Dingbats": "Medium"
              }
          }
        }
    ],
    
   "replFonts":[
            {"fontFamily":"ITC New Baskerville", "fontStyle":"Roman"},
            {"fontFamily":"Helvetica Neue LT Std", "fontStyle":"55 Roman"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlCRRH']", "frame-name":"CRRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlCLRH']", "frame-name":"CLRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlRRH']", "frame-name":"RRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlLRH']", "frame-name":"LRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlMetaInfo']", "frame-name":"METAINFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null}
       ]       
     },
    "colorDetails":{
            "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
              "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
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
            "RELATED_ARTICLE_INFO": false
        }
    }
}