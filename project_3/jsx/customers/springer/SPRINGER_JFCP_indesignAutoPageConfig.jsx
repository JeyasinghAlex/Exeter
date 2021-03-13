﻿var config = {
    "defaultUnits":"pt",
    "baseLeading":14,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "pageCountDetails":"Rounded",
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
        "width":612,
        "height":792
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
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[72,48,724,546
    ],
    "geoBoundsRecto":[72,678,724,1176
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "EDITORIAL":"LAYOUT2"     
    },
    "pageColumnDetails":{
     "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":237, "height":609,"floatsCited":false,"gutter":0},
                  {"width":237, "height":609,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":237, "height":651,"floatsCited":false,"gutter":0},
                  {"width":237, "height":651,"floatsCited":false,"gutter":24}
                ],
                 "openerPageMargin":{
                    "top":72,
                    "bottom":69,
                    "inside":66,
                    "outside":48
                },
            "otherPageMargin":{
                    "top":72,
                    "bottom":69,
                    "inside":66,
                    "outside":48
                }
            },
       "LAYOUT2":{        
            "openerPageColumnDetails":[
                  {"width":237, "height":609,"floatsCited":false,"gutter":0},
                  {"width":237, "height":609,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":237, "height":651,"floatsCited":false,"gutter":0},
                  {"width":237, "height":651,"floatsCited":false,"gutter":24}
                ],
                 "openerPageMargin":{
                    "top":72,
                    "bottom":69,
                    "inside":66,
                    "outside":48
                },
            "otherPageMargin":{
                    "top":72,
                    "bottom":69,
                    "inside":66,
                    "outside":48
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
      "twoThirdWidth":373.5,
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
        "continuedText": "(<i>(Continued)</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
        "continuedText":"Table [ID]. [CAPTION][ensp](<i>(Continued)</i>)",
//        "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
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
          "Times New Roman": {
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
                "Symbol (T1)": "Bold Italic"
              }
          }
      },
        {
          "Arial": {
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
                "Symbol (T1)": "Bold Italic"
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
            {"fontFamily":"Times New Roman", "fontStyle":"Bold"},
            {"fontFamily":"Times New Roman", "fontStyle":"Italic"},
            {"fontFamily":"Times New Roman", "fontStyle":"Roman"},
            {"fontFamily":"Times New Roman", "fontStyle":"Bold Italic"},
            {"fontFamily":"Arial", "fontStyle":"Italic"},
            {"fontFamily":"Arial", "fontStyle":"Roman"},
            {"fontFamily":"Arial", "fontStyle":"Italic"},
            {"fontFamily":"Arial", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBL']", "frame-name":"CRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVBR']", "frame-name":"CVBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRBL']", "frame-name":"TRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVBR']", "frame-name":"TVBR", "action":"move", "styleOverride":null},
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
                    "colourValue":"0,0,0"
                    },
                
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
        "DEFAULT":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
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
                    "colourValue":"0,0,0"
                    },
                
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            }
                
            },
        "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "10pt",
                    "font-family" : "'TimesNewRoman', TimesNewRoman"
                },
                "fontPath"  : "TimesNewRoman/TimesNewRoman.ttf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'TimesNewRoman-Bold',TimesNewRoman-Bold",
                    "font-size" : "10pt",
                    "line-height" : "12pt",
                     "padding" : "1px 0px 1px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'TimesNewRoman',TimesNewRoman",
                    "font-size" : "10pt",
                    "line-height" : "12pt",
                    "padding" : "0px 0px 1px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "612 pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "14pt",
                  "path"    : "/TimesNewRoman/",
                     "ext"     : "ttf",
                  "bold"    : "TimesNewRoman-Bold",
                  "italic"  : "TimesNewRoman-Italic",
                  "bold_italic":"TimesNewRoman-BoldItalic",
                  "main"    : "TimesNewRoman"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "612 pt"
              },
              "font" : {
                "size"    : "10pt",
                "ledding" : "12pt",
                 "path"    : "/TimesNewRoman/",
                  "ext"     : "ttf",
                  "bold"    : "TimesNewRoman-Bold",
                  "italic"  : "TimesNewRoman-Italic",
                  "bold_italic":"TimesNewRoman-BoldItalic",
                  "main"    : "TimesNewRoman"
              }
           }
        },
    "stubColObj":{
        "bottom": {
            "METAINFO": false,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": false
        },
        "top": {
            "STUB_COLUMN": true,
            "STUB_STMT": false
        }
    },
"runOnSectionsOrArticles":[
       {"xpath":"//div[@class='jrnlAppGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                 "openerPageColumnDetails":[
                  {"width":498, "height":609,"floatsCited":false,"gutter":0}
                  ],
                "columnDetails":[
                     {"width":498, "height":651,"floatsCited":false,"gutter":0},
                ],
      "openerPageMargin":{
                    "top":72,
                    "bottom":69,
                    "inside":66,
                    "outside":48
                },
            "otherPageMargin":{
                    "top":72,
                    "bottom":69,
                    "inside":66,
                    "outside":48
                }
                }
            }
        ]
}