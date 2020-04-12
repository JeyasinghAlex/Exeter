var config = {
    "bookmarks":3,
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
                 {"width":372, "height":521.497,"floatsCited":false,"gutter":0}
              
                ],
                "columnDetails":[
                  {"width":372, "height":560.154,"floatsCited":false,"gutter":0}
             
                ],
                "openerPageMargin":{
                   "top":65.25,
                    "bottom":76.25,
                    "inside":60,
                    "outside":55.559
                },
            "otherPageMargin":{
                "top":65.25,
                "bottom":66.25,
                "inside":60,
                "outside":55.559
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
      },
   "box":{
      "header": {
        "continuedText":"Continued.",
        "spaceBelow": 12,
        "boxContinuedStyle": "BOX_ContHead"
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
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlSTRH']", "frame-name":"STRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlALH']", "frame-name":"ALH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},         
         {"xpath" : "//div[@class='jrnlCRRH']", "frame-name":"CRRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCLRH']", "frame-name":"CLRH", "action":"move", "styleOverride":null}
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
                    "colourValue":"0,0,0,20"
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
                    "colourValue":"217,217,217"
                    },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
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
                    "font-family" : "'Helvetica Neue LT Std', Times New Roman",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "0px 4px 0px 4px",
                },
                 "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd.otf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Helvetica Neue LT Std', Times New Roman",
                    "font-size" : "9px",
                    "line-height"  : "11px",
                    "padding" : "0px 4px 0px 4px",
                },
                 "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd.otf",
                "align" : "left",
                "valign": "bottom"
            }
        },
    "equation" : {
          "default" : {
              "page":{
                  "size" : "372pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "12pt",
                  "path"    : "/Palatino LT Std/",
                  "ext"     : "otf",
                  "bold"    : "Palatino LT Std-Bold",
                  "italic"  : "Palatino LT Std-Italic",
                  "bold_italic":"Palatino LT Std-BoldItalic",
                  "main"    : "Palatino LT Std-Roman"
              }
           },
          "jrnlAbsPara" : {
              "page":{
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "10pt",
                "ledding" : "12pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Book-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Book"
              }
          },
           "jrnlAbsGroup" : {
              "page":{
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "10pt",
                "ledding" : "12pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Book-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Book",
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
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Book-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Book"
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
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "12pt",
                "ledding" : "14pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Book-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Bold"
              }
          },
          "jrnlHead2" : {
              "page":{
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "10pt",
                "ledding" : "12pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Book",
                "italic"  : "Helvetica Neue LT Std-Book-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Book"
              }
          },
           "jrnlHead3" : {
              "page":{
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "10pt",
                "ledding" : "12pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Book-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Book-Italic"
              }
          },
       "jrnlHead4" : {
              "page":{
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "6.3pt",
                "ledding" : "8.3pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Book-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Book-Italic"
              }
          },
           "jrnlTblCaption" : {
              "page":{
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Book-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Book"
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
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "8pt",
                "ledding" : "10pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Book-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Book"
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
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Semibold",
                "italic"  : "Helvetica Neue LT Std-SemiboldIt",
                "bold_italic":"Helvetica Neue LT Std-Semibold",
                "main"  : "Helvetica Neue LT Std-Semibold"
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
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Italic",
                "bold_italic":"Helvetica Neue LT Std-BoldItalic",
                "main"    : "Helvetica Neue LT Std-Regular"
              }
         },
           "txtCiteInfo" : {
              "page":{
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "7pt",
                "ledding" : "9pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Light-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Light"
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
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "20pt",
                "ledding" : "23pt",
                "path"    : "/Helvetica Neue LT Std/",
                "ext"     : "otf",
                "bold"    : "Helvetica Neue LT Std-Bold",
                "italic"  : "Helvetica Neue LT Std-Bold-Italic",
                "bold_italic":"Helvetica Neue LT Std-Bold-Italic",
                "main"  : "Helvetica Neue LT Std-Bold"
              }
          },
         "jrnlTblBlock" : {
            "page":{
                "size" : "372pt"
            },
            "font" : {
              "size"    : "9pt",
              "ledding" : "11pt",
              "path"    : "/Helvetica Neue LT Std/",
              "ext"     : "otf",
              "bold"    : "Helvetica Neue LT Std-Bold",
              "italic"  : "Helvetica Neue LT Std-Italic",
              "bold_italic":"Helvetica Neue LT Std-BoldItalic",
              "main"    : "Helvetica Neue LT Std-Regular",
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
                        {"width":372, "height":521.497,"floatsCited":false,"gutter":0}
                      ],
                    "columnDetails":[
                        {"width":372, "height":560.882,"floatsCited":false,"gutter":0}
                    ],
                "openerPageMargin":{
                  "top":65.25,
                    "bottom":76.25,
                    "inside":60,
                    "outside":55.559
                },
                "otherPageMargin":{
                "top":65.25,
                "bottom":66.25,
                "inside":60,
                "outside":55.559
                    }
                }
            },
        {"xpath":"//div[@class='jrnlAppBlock1']",
            "continueType":"samePage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                       {"width":372, "height":521.497,"floatsCited":false,"gutter":0}
                      ],
                    "columnDetails":[
                       {"width":372, "height":560.882,"floatsCited":false,"gutter":0}
                    ],
                    "openerPageMargin":{
                      "top":65.25,
                    "bottom":76.25,
                    "inside":60,
                    "outside":55.559
                    },
                "otherPageMargin":{
                     "top":65.25,
                "bottom":66.25,
                "inside":60,
                "outside":55.559
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