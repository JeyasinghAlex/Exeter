var config = {
    "bookmarks":4,
    "pubIdentifier":"10.1136", 
    "defaultUnits":"pt",
    "baseLeading":10,
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
        "width":612,
        "height":809.972
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
            },
        "toc":{
            "print":"BMJ_cover-Print",
            "online":"BMJ_cover-Online"
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
    "geoBoundsVerso":[45,60,741.322,552
    ],
    "geoBoundsRecto":[45,672,741.322,1164
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "PROTOCOL":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":240, "height":696.322,"floatsCited":false,"gutter":0},
                  {"width":240, "height":696.322,"floatsCited":false,"gutter":12}
                ],
                "columnDetails":[
                  {"width":240, "height":696.322,"floatsCited":false,"gutter":0},
                  {"width":240, "height":696.322,"floatsCited":false,"gutter":12}
                ],
                "openerPageMargin":{
                 "top":45,
                "bottom":68.65,
                "inside":60,
                "outside":60
                },
            "otherPageMargin":{
                 "top":45,
                "bottom":68.65,
                "inside":60,
                "outside":60
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
      "singleColumnStyle":true,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":369, 
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
        "continuedText": "(<i>Continued</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
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
            "minimum":[30,35,45],
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
          "Times": {
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
          "Helvetica LT Std": {
            "Roman": {
                "Symbol (T1)": "Regular"
              },
                "Oblique": {
                    "Symbol (T1)": "Italic"
              },
                "Bold": {
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
            {"fontFamily":"Times", "fontStyle":"Roman"},
            {"fontFamily":"Times", "fontStyle":"Italic"},
            {"fontFamily":"Times", "fontStyle":"Bold"},
            {"fontFamily":"Times", "fontStyle":"Bold Italic"},
            {"fontFamily":"Helvetica LT Std", "fontStyle":"Roman"},
            {"fontFamily":"Helvetica LT Std", "fontStyle":"Oblique"},
            {"fontFamily":"Helvetica LT Std", "fontStyle":"Bold Oblique"},
            {"fontFamily":"Helvetica LT Std", "fontStyle":"Bold"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
          {"xpath" : "//div[@class='jrnlAuthors']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBL']", "frame-name":"CRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBC']", "frame-name":"CRBC", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBR']", "frame-name":"CRBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVBR']", "frame-name":"CVBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVBC']", "frame-name":"CVBC", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVBL']", "frame-name":"CVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVBL']", "frame-name":"TVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRBR']", "frame-name":"TRBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRBL']", "frame-name":"TRBL", "action":"move", "styleOverride":null}
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
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
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
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"255,255,255"
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
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
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
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"255,255,255"
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
            "thead": {
                "css" : {
                    "font-family" : "'Times-Roman', Times-Roman",
                    "font-size" : "8px",
                    "line-height" : "9px",
                    "padding" : "5.5px 0px 6px 0px",
                },
                 "fontPath"  : "Times-Roman/Times-Roman.ttf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'TimesNewRoman', Times New Roman",
                    "font-size" : "8px",
                    "line-height"  : "9px",
                    "padding" : "6px 0px 2px 0px",
                },
                 "fontPath"  : "Times-Roman/Times-Roman.ttf",
                "align" : "left",
                "valign": "bottom"
            },
            "charAlignCenter": true
        },
        "equation" : {
          "default" : {
              "page":{
                  "size" : "492pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "10pt",
                "path"    : "/Times-Roman/",
                "ext"     : "ttf",
                "bold"    : "Times-Bold",
                "italic"  : "Times-Italic",
                "bold_italic":"Times-BoldItalic",
                "main"    : "Times-Roman",
              }
           },
           "jrnlFigCaption" : {
              "page":{
                  "size" : "492pt"
              },
              "font" : {
                "size"    : "8pt",
                "ledding" : "9pt",
                "path"    : "/HelveticaLTStd/",
                "ext"     : "otf",
                "bold"    : "HelveticaLTStd-Bold",
                "italic"  : "HelveticaLTStd-Obl",
                "bold_italic":"HelveticaLTStd-BoldObl",
                "main"    : "HelveticaLTStd-Bold",
              },
              "online" : {
                "textColor"    : "0, 0, 0"
              },
              "print" : {
                "textColor"    : "0,0,0,100"
              }
           },
           "jrnlTblCaption" : {
              "page":{
                  "size" : "492pt"
              },
              "font" : {
                "size"    : "8pt",
                "ledding" : "9pt",
                "path"    : "/HelveticaLTStd/",
                "ext"     : "otf",
                "bold"    : "HelveticaLTStd-Bold",
                "italic"  : "HelveticaLTStd-Obl",
                "bold_italic":"HelveticaLTStd-BoldObl",
                "main"    : "HelveticaLTStd-Bold",
              },
              "online" : {
                "textColor"    : "0, 0, 0"
              },
              "print" : {
                "textColor"    : "0,0,0,100"
              }
           },
         "jrnlTblBlock" : {
            "page":{
                "size" : "492pt"
            },
            "font" : {
              "size"    : "8pt",
                "ledding" : "9pt",
                "path"    : "/Times-Roman/",
                "ext"     : "ttf",
                "bold"    : "Times-Bold",
                "italic"  : "Times-Italic",
                "bold_italic":"Times-BoldItalic",
                "main"    : "Times-Roman",
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
    },
     "tocDetails":{   
       "singlePageToc": false,
       "maximumTocFrameHeight":514.667,
       "backGroundColor":true,
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
           "MinionPro":{  
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