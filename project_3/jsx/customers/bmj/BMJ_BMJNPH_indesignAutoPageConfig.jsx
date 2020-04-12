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
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":true,
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
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[48.5,40.5,740.5,554.775590551182
    ],
    "geoBoundsRecto":[48.5,635.775590551181,740.5,1150.05159055118
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "RESEARCH":"LAYOUT1",
    "REVIEW":"LAYOUT1",
    "BFRS":"LAYOUT1",
    "MISCELLANEOUS":"LAYOUT2",
    "THANK":"LAYOUT3",
    "EDITORIAL":"LAYOUT4",
    "LETTER":"LAYOUT4"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":196.426, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":196.426, "height":690.81,"floatsCited":false,"gutter":15}
                ],
                "columnDetails":[
                  {"width":247.888, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":247.888, "height":690.81,"floatsCited":false,"gutter":18.5}
                ],
                "openerPageMargin":{
                 "top":48.5,
                "bottom":54.425,
                "inside":146.92,
                "outside":40.5
                },
            "otherPageMargin":{
                 "top":48.5,
                "bottom":54.425,
                "inside":40.5,
                "outside":40.5
                }
            },
         "LAYOUT2":{
                "openerPageColumnDetails":[
                  {"width":373.25, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":373.25, "height":690.81,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":373.25, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":373.25, "height":690.81,"floatsCited":false,"gutter":0}
                ],
                 "openerPageMargin":{
                 "top":48.5,
                "bottom":54.425,
                "inside":110.5,
                "outside":40.5
                },
            "otherPageMargin":{
                 "top":48.5,
                "bottom":54.425,
                "inside":111.013,
                "outside":40.5
                }
             },
         "LAYOUT3":{
                "openerPageColumnDetails":[
                  {"width":117.319, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":117.319, "height":690.81,"floatsCited":false,"gutter":15},
                  {"width":117.319, "height":690.81,"floatsCited":false,"gutter":15},
                  {"width":117.319, "height":690.81,"floatsCited":false,"gutter":15}
                ],
                "columnDetails":[
                  {"width":117.319, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":117.319, "height":690.81,"floatsCited":false,"gutter":15},
                  {"width":117.319, "height":690.81,"floatsCited":false,"gutter":15},
                  {"width":117.319, "height":690.81,"floatsCited":false,"gutter":15}
                ],
                 "openerPageMargin":{
                 "top":48.5,
                "bottom":54.425,
                "inside":40.5,
                "outside":40.5
                },
            "otherPageMargin":{
                 "top":48.5,
                "bottom":54.425,
                "inside":40.5,
                "outside":40.5
                }
             },
         "LAYOUT4":{
                "openerPageColumnDetails":[
                  {"width":163.092, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":163.092, "height":690.81,"floatsCited":false,"gutter":12.5},
                  {"width":163.092, "height":690.81,"floatsCited":false,"gutter":12.5}
                ],
                "columnDetails":[
                  {"width":163.092, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":163.092, "height":690.81,"floatsCited":false,"gutter":12.5},
                  {"width":163.092, "height":690.81,"floatsCited":false,"gutter":12.5}
                ],
                 "openerPageMargin":{
                 "top":48.5,
                "bottom":54.425,
                "inside":40.5,
                "outside":40.5
                },
            "otherPageMargin":{
                 "top":48.5,
                "bottom":54.425,
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
          "ClassGarmnd BT": {
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
          "Frutiger LT Pro": {
            "47 Light Condensed": {
                "Symbol (T1)": "Regular"
              },
                "48 Light Condensed Italic": {
                    "Symbol (T1)": "Italic"
              },
                "57 Condensed": {
                    "Symbol (T1)": "Regular"
            },
                "58 Condensed Italic": {
                    "Symbol (T1)": "Italic"
            },
                "67 Bold Condensed": {
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
            {"fontFamily":"ClassGarmnd BT", "fontStyle":"Roman"},
            {"fontFamily":"ClassGarmnd BT", "fontStyle":"Italic"},
            {"fontFamily":"ClassGarmnd BT", "fontStyle":"Bold"},
            {"fontFamily":"ClassGarmnd BT", "fontStyle":"Bold Italic"},
            {"fontFamily":"Frutiger LT Pro", "fontStyle":"47 Light Condensed"},
            {"fontFamily":"Frutiger LT Pro", "fontStyle":"48 Light Condensed Italic"},
            {"fontFamily":"Frutiger LT Pro", "fontStyle":"57 Condensed"},
            {"fontFamily":"Frutiger LT Pro", "fontStyle":"58 Condensed Italic"},
            {"fontFamily":"Frutiger LT Pro", "fontStyle":"67 Bold Condensed"},
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
                    "colourValue":"90,90,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"30,20,0,0"
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
                    "colourValue":"65,64,153"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"175,189,225"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
            "RESEARCH":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"90,90,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"30,20,0,0"
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
                    "colourValue":"65,64,153"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"175,189,225"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
            "REVIEW":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,86,76,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,26,23,0"
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
                    "colourValue":"230,56,47"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"247,195,193"
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
                    "colourValue":"90,90,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"30,20,0,0"
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
                    "colourValue":"65,64,153"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"175,189,225"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
          "BFRS":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,88,24,5"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"20,18,5,1"
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
                    "colourValue":"24,43,132"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"209,213,230"
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
                    "colourValue":"90,90,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"30,20,0,0"
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
                    "colourValue":"65,64,153"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"175,189,225"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
             },
          "EDITORIAL":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,86,76,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,26,23,0"
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
                    "colourValue":"230,56,47"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"247,195,193"
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
                    "colourValue":"100,1,100,1"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"20,0,20,0"
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
                    "colourValue":"2,145,55"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"204,233,215"
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
                    "font-size" : "9px",
                    "font-family" : "'Helvetica Neue LT Std', HelveticaNeueLTStd"
                }
            },
            "thead": {
                "css" : {
                    "font-family" : "'Helvetica Neue LT Std-75 Bold',HelveticaNeueLTStd-75Bold",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "4px 0px 4px 4px",
                },
                 "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd-Bd.otf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Helvetica Neue LT Std-55 Roman',HelveticaNeueLTStd-55Roman",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "4px 0px 4px 4px",
                },
                "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd-Roman_0.otf",
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
                  "size"    : "10pt",
                  "ledding" : "12pt",
                  "path"    : "/ITCNewBaskervilleRoman/",
                     "ext"     : "ttf",
                  "bold"    : "ITCNewBaskervilleBold",
                  "italic"  : "ITCNewBaskervilleItalic",
                  "bold_italic":"ITCNewBaskervilleBoldItalic",
                  "main"    : "ITCNewBaskervilleRoman"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "511.276pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/HelveticaNeueLTStd/",
                "ext"     : "otf",
                  "bold"    : "HelveticaNeueLTStd-Bd",
                  "italic"  : "HelveticaNeueLTStd-It",
                  "bold-italic":"HelveticaNeueLTStd-BdIt",
                  "main":"HelveticaNeueLTStd-Roman_0",
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
            "COPYRIGHTSTMT_INFO": false,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": true
        }
    }
}