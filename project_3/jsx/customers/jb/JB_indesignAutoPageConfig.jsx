var config = {
    "defaultUnits":"pt",
    "baseLeading":12,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":487.559,
        "height":691.654
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            },
          "cover":{
            "print":"BMJ_cover-Print",
            "online":"BMJ_cover-Online"
            },
        "toc":{
            "print":"BMJ_cover-Print",
            "online":"BMJ_cover-Online"
            },
        "advert":{
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
            }
        },        
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[65.25,55.5,625.403543307087,427.55905511811
    ],
    "geoBoundsRecto":[65.25,547.55905511811,625.403543307087,919.618110236221
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                 {"width":340.16, "height":513.715,"floatsCited":false,"gutter":0}
              
                ],
                "columnDetails":[
                  {"width":340.16, "height":534.152,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                   "top":96,
                    "bottom":70.6,
                    "inside":56.7,
                    "outside":56.7
                },
            "otherPageMargin":{
                "top":75.5,
                "bottom":70.7,
                "inside":56.7,
                "outside":56.7
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
      "twoThirdWidth":340.85, 
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
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead1_After_UL,jrnlHead2,jrnlHead2_H1,jrnlHead3,jrnlHead3_H2,jrnlHead4,jrnlHead4_H3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,QUOTE-O",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead1_After_UL,jrnlHead2,jrnlHead2_H1,jrnlHead3,jrnlHead3_H2,jrnlHead4,jrnlHead4_H3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,QUOTE-O",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4",
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
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//p[@pstyle='jrnlSTRH']", "frame-name":"RRH", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlALH']", "frame-name":"LRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},         
         {"xpath" : "//div[@class='jrnlDCRRH']", "frame-name":"DCRRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlDCLRH']", "frame-name":"DCLRH", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@class='jrnlRRH']", "frame-name":"RRH", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@class='jrnlLRH']", "frame-name":"LRH", "action":"move", "styleOverride":null}
       ]       
     },
 "colorDetails":{
         "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"56,18,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"16,5,1,0"
                    },
                  "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,90,30,8"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"95,172,223"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"210,226,241"
                    },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"38,60,116"
                    }
                }            
            }
        },
    "tableSetter" :{
            "thead": {
                "css" : {
                    "font-family" : "'Minion Pro', Times New Roman",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "0px 4px 0px 4px",
                },
                 "fontPath"  : "Minion Pro/Minion Pro.otf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Minion Pro'', Times New Roman",
                    "font-size" : "9px",
                    "line-height"  : "11px",
                    "padding" : "0px 4px 0px 4px",
                },
                 "fontPath"  : "Minion Pro/Minion Pro.otf",
                "align" : "left",
                "valign": "bottom"
            }
        },
    "equation" : {
          "default" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "12pt",
                  "path"    : "/MinionPro/",
                  "ext"     : "otf",
                  "bold"    : "MinionProBold",
                  "italic"  : "MinionProItalic",
                  "bold_italic":"MinionProBoldItalic",
                  "main"    : "MinionProRegular"
              }
           },
          "jrnlAbsPara" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "10pt",
                "ledding" : "12pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Bold",
                "italic"  : "Gotham-Book-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Book"
              }
          },
           "jrnlAbsGroup" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "10pt",
                "ledding" : "12pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Bold",
                "italic"  : "Gotham-Book-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Book",
              },
              "online" : {
                "textColor"    : "88, 89, 91"
              },
              "print" : {
                "textColor"    : "0,0,0,0.8"
              }
          },
           "jrnlFigCaption" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Bold",
                "italic"  : "Gotham-Book-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Book"
              },
              "online" : {
                "textColor"    : "88, 89, 91"
              },
              "print" : {
                "textColor"    : "0,0,0,0.8"
              }
           },
           "jrnlHead1" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "12pt",
                "ledding" : "14pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Bold",
                "italic"  : "Gotham-Book-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Bold"
              }
          },
          "jrnlHead2" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "10pt",
                "ledding" : "12pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Book",
                "italic"  : "Gotham-Book-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Book"
              }
          },
           "jrnlHead3" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "10pt",
                "ledding" : "12pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Bold",
                "italic"  : "Gotham-Book-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Book-Italic"
              }
          },
       "jrnlHead4" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "6.3pt",
                "ledding" : "8.3pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Bold",
                "italic"  : "Gotham-Book-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Book-Italic"
              }
          },
           "jrnlTblCaption" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Bold",
                "italic"  : "Gotham-Book-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Book"
              },
              "online" : {
                "textColor"    : "88, 89, 91"
              },
              "print" : {
                "textColor"    : "0,0,0,0.8"
              }
           },
           "jrnlTblFoot" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "8pt",
                "ledding" : "10pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Bold",
                "italic"  : "Gotham-Book-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Book"
              },
              "online" : {
                "textColor"    : "88, 89, 91"
              },
              "print" : {
                "textColor"    : "0,0,0,0.8"
              }
           },
           "jrnlTblHead" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/MinionPro/",
                "ext"     : "otf",
                "bold"    : "MinionProSemibold",
                "italic"  : "MinionProSemiboldIt",
                "bold_italic":"MinionProSemibold",
                "main"  : "MinionProSemibold"
              },
              "online" : {
                "textColor"    : "88, 89, 91"
              },
              "print" : {
                "textColor"    : "0,0,0,0.8"
              }
          },
           "jrnlTblBody" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/MinionPro/",
                "ext"     : "otf",
                "bold"    : "MinionProBold",
                "italic"  : "MinionProItalic",
                "bold_italic":"MinionProBoldItalic",
                "main"    : "MinionProRegular"
              }
         },
           "txtCiteInfo" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "7pt",
                "ledding" : "9pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Bold",
                "italic"  : "Gotham-Light-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Light"
              },
              "online" : {
                "textColor"    : "109, 110, 113"
              },
              "print" : {
                "textColor"    : "0,0,0,0.7"
              }
          },
           "jrnlArtTitle" : {
              "page":{
                  "size" : "372.059pt"
              },
              "font" : {
                "size"    : "20pt",
                "ledding" : "23pt",
                "path"    : "/Gotham/",
                "ext"     : "otf",
                "bold"    : "Gotham-Bold",
                "italic"  : "Gotham-Bold-Italic",
                "bold_italic":"Gotham-Bold-Italic",
                "main"  : "Gotham-Bold"
              }
          },
         "jrnlTblBlock" : {
            "page":{
                "size" : "372.059pt"
            },
            "font" : {
              "size"    : "9pt",
              "ledding" : "11pt",
              "path"    : "/MinionPro/",
              "ext"     : "otf",
              "bold"    : "MinionProBold",
              "italic"  : "MinionProItalic",
              "bold_italic":"MinionProBoldItalic",
              "main"    : "MinionProRegular",
            }
         }
    },
 "runOnSectionsOrArticles":[
        {"xpath":"//div[@class='jrnlRefBlock']",
            "continueType":"samePage",
            "spaceAbove":60,
            "firstbaselineOffset":1296852079,
            "rule":{"width":"0.5","offset":"15","showOnPageTop":"false"},
            "columnDetails":{        
              "openerPageColumnDetails":[
                 {"width":340.16, "height":516,"floatsCited":false,"gutter":0}
              
                ],
                "columnDetails":[
                  {"width":340.16, "height":537.88,"floatsCited":false,"gutter":0}
             
                ],
                "openerPageMargin":{
                  "top":96,
                    "bottom":70.6,
                    "inside":56.7,
                    "outside":56.7
                },
                "otherPageMargin":{
                "top":75.5,
                "bottom":70.7,
                "inside":56.7,
                "outside":56.7
                    }
                }
            },
        {"xpath":"//div[@class='jrnlAppBlock1']",
            "continueType":"samePage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
               "columnDetails":{        
              "openerPageColumnDetails":[
                 {"width":340.16, "height":516,"floatsCited":false,"gutter":0}
              
                ],
                "columnDetails":[
                  {"width":340.16, "height":537.88,"floatsCited":false,"gutter":0}
             
                ],
               "openerPageMargin":{
                  "top":96,
                    "bottom":70.6,
                    "inside":56.7,
                    "outside":56.7
                },
                "otherPageMargin":{
                "top":75.5,
                "bottom":70.7,
                "inside":56.7,
                "outside":56.7
                    }
                }
            }
        ],
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
