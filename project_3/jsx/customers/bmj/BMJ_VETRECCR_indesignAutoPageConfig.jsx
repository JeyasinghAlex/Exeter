var config = {
    "bookmarks":4,
    "pubIdentifier":"10.1136",
    "defaultUnits":"pt",
    "baseLeading":12,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY,KEY_BACK",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "applyTableLeftRightBorder":true,
    "minNoLinesOnPag":3,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":595.276,
        "height":793.701
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":false, 
            "registration_marks":true, 
            "colour_bars":false, 
            "page_information":false,
            "offset":8.504
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            }
        },
    "watermark":{
        "Pre-editing":true, 
        "Typesetter QA":true, 
        "Author proof":true, 
        "Author revision":true, 
        "Revises":true,
        "Copyediting":true, 
        "Copyediting Check":true, 
        "Typesetter Check":true, 
        "Publisher Check":true, 
        "Author Review":true, 
        "Publisher Review":true, 
        "Author Revision":true
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":18.363,
      "right":18.363,
      "gutter":18.363
    },
    "geoBoundsVerso":[55,42,699.837890625,553.276
    ],
    "geoBoundsRecto":[55,637.275590551181,699.837890625,1148.55118110236
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "ED":"LAYOUT2",
    "LETTER":"LAYOUT2",
    "MISC":"LAYOUT2",
    "JOURNALSCAN":"LAYOUT2",
    "THANK":"LAYOUT3",
    "MISCELLANEOUS":"LAYOUT4"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
                "openerPageColumnDetails":[
                  {"width":198.042, "height":699.83,"floatsCited":false,"gutter":0},
                  {"width":198.042, "height":699.83,"floatsCited":false,"gutter":12.5}
                ],
                "columnDetails":[
                  {"width":246.457, "height":699.83,"floatsCited":false,"gutter":0},
                  {"width":246.457, "height":699.83,"floatsCited":false,"gutter":18.363}
                ],
               "openerPageMargin":{
                    "top":55,
                    "bottom":38.5,
                    "inside":144.691,
                    "outside":42
                },
            "otherPageMargin":{
                "top":55,
                "bottom":38.5,
                "inside":42,
                "outside":42
                }
            },
         "LAYOUT2":{
                "openerPageColumnDetails":[
                  {"width":198.042, "height":699.83,"floatsCited":false,"gutter":0},
                  {"width":198.042, "height":699.83,"floatsCited":false,"gutter":18.363}
                ],
                "columnDetails":[
                  {"width":246.457, "height":699.83,"floatsCited":false,"gutter":0},
                  {"width":246.457, "height":699.83,"floatsCited":false,"gutter":18.363}
                ],
                 "openerPageMargin":{
                    "top":55,
                    "bottom":38.5,
                    "inside":144.66,
                    "outside":42
                },
            "otherPageMargin":{
                "top":55,
                "bottom":38.5,
                "inside":42,
                "outside":42
                }
             },
         "LAYOUT3":{
                "openerPageColumnDetails":[
                  {"width":116.569, "height":699.83,"floatsCited":false,"gutter":0},
                  {"width":116.569, "height":699.83,"floatsCited":false,"gutter":15},
                  {"width":116.569, "height":699.83,"floatsCited":false,"gutter":15},
                  {"width":116.569, "height":699.83,"floatsCited":false,"gutter":15}
                ],
                "columnDetails":[
                  {"width":116.569, "height":699.83,"floatsCited":false,"gutter":0},
                  {"width":116.569, "height":699.83,"floatsCited":false,"gutter":15},
                  {"width":116.569, "height":699.83,"floatsCited":false,"gutter":15},
                  {"width":116.569, "height":699.83,"floatsCited":false,"gutter":15}
                ],
                 "openerPageMargin":{
                    "top":55,
                    "bottom":38.5,
                    "inside":144.66,
                    "outside":42
                },
            "otherPageMargin":{
                "top":55,
                "bottom":38.5,
                "inside":42,
                "outside":42
                }
             },
          "LAYOUT4":{
            "openerPageColumnDetails":[
                  {"width":374, "height":691.201,"floatsCited":false,"gutter":0},
                   ],
                "columnDetails":[
                  {"width":374, "height":691.201,"floatsCited":false,"gutter":0},
                  ],
             "openerPageMargin":{
               "top":60,
                "bottom":42.5,
                "inside":42,
                "outside":42
                },
            "otherPageMargin":{
                "top":56.5,
                "bottom":46,
                "inside":42,
                "outside":42
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
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":true,//if this is true then the landscape float could be placed in landscape single column
      "twoThirdColumnStyle":false,//if this is true then the landscape float could be placed in landscape two third column
      "twoThirdWidth":340.85, 
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
            "minimum":[30,35,45],
            "maximum":[60,70,80]
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
                "Symbol (T1)": "Medium"
              },
            "Italic": {
                "Symbol": "Italic"
              },
            "Bold": {
                "Symbol": "Bold"
              }
//~             "Light": {
//~                 "Myriad Pro": "Light",
//~                 "Symbol": "Regular"
//~               },
//~                 "Bold": {
//~                     "Myriad Pro": "Bold",
//~                     "Symbol": "Bold"
//~               },
//~                 "Bold Italic": {
//~                     "Myriad Pro": "Bold Italic",
//~                     "Symbol": "Bold"
//~               }
          }
      },
        {
          "Helvetica Neue LT Std": {
            "55 Roman": {
                "Symbol": "Medium"
              },
                "56 Italic": {
                    "Symbol": "Italic"
              },
                "75 Bold": {
                    "Symbol": "Bold"
            }
          }
        }
    ],
    
   "replFonts":[
            {"fontFamily":"ITC New Baskerville", "fontStyle":"Roman"},
            {"fontFamily":"Helvetica Neue LT Std", "fontStyle":"55 Roman"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlCRRH']", "frame-name":"CRRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlCLRH']", "frame-name":"CLRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlRRH']", "frame-name":"RRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlLRH']", "frame-name":"LRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlMetaInfo']", "frame-name":"METAINFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCopyrightStmtInfo']", "frame-name":"COPYRIGHTSTMT_INFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null}
       ]       
     },
    "colorDetails":{
            "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"69,94,18,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"14,19,4,0"
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
                    "colourValue":"114,57,131"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"215,202,219"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
            "LETTER":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"69,94,18,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"14,19,4,0"
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
                    "colourValue":"114,57,131"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"215,202,219"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
            "DEFAULT":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"69,94,18,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"14,19,4,0"
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
                    "colourValue":"114,57,131"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"215,202,219"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
            "MISC":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"69,94,18,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"14,19,4,0"
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
                    "colourValue":"114,57,131"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"215,202,219"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
            "ED":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"69,94,18,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"14,19,4,0"
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
                    "colourValue":"114,57,131"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"215,202,219"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
            "JOURNALSCAN":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"69,94,18,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"14,19,4,0"
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
                    "colourValue":"114,57,131"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"215,202,219"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
            "THANK":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"69,94,18,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"14,19,4,0"
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
                    "colourValue":"114,57,131"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"215,202,219"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
        "MISCELLANEOUS":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"69,94,18,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"14,19,4,0"
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
                    "colourValue":"114,57,131"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"215,202,219"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            }
       },
   "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "7.5px",
                    "font-family" : "'Frutiger LT Pro', FrutigerLTPro"
                },
                "fontPath"  : "frutigerltpro-condensed/frutigerltpro-condensed.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'Frutiger LT Pro-67 Bold Condensed',FrutigerLTPro-67BoldCondensed",
                    "font-size" : "7.5px",
                    "line-height" : "9.5px",
                    "padding" : "4px 0px 4px 4px",
                },
                "fontPath"  : "frutigerltpro-condensed/frutigerltpro-boldcn_0.otf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Frutiger LT Pro-57 Condensed',FrutigerLTPro-57Condensed",
                    "font-size" : "7.5px",
                    "line-height" : "9.5px",
                    "padding" : "4px 0px 4px 4px",
                },
                "fontPath"  : "frutigerltpro-condensed/frutigerltpro-condensed.otf",
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "511.276pt"
              },
              "font" : {
                  "size"    : "9pt",
                  "ledding" : "11pt",
                  "path"    : "/ClassGarmnd_BT_Font/",
                     "ext"     : "ttf",
                  "bold"    : "CLSGARAB",
                  "italic"  : "CLSGARAI",
                  "bold_italic":"CLSGARBI",
                  "main"    : "CLSGARAN"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "511.276pt"
              },
              "font" : {
                "size"    : "7.5pt",
                "ledding" : "9.5pt",
                "path"    : "/frutigerltpro-condensed/",
                "ext"     : "otf",
                  "bold"    : "frutigerltpro-boldcn_0",
                  "italic"  : "frutigerltpro-condensedita",
                  "bold-italic":"frutigerltpro-boldcnita",
                  "main":"frutigerltpro-condensed",
              }
           }
        },
    "stubColObj":{
        "bottom": {
            "METAINFO": false,
            "COPYRIGHTSTMT_INFO": false,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": false
        },
        "top": {
            "STUB_COLUMN": true,
            "STUB_STMT": false
        }
    }
}