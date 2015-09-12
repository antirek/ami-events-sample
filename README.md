# ami-events-sample


[logout]
exten=>_X.,1,Dial(SIP/${EXTEN},,U(pretech,answer1,${ORIGINATE_ACTIONID}))

[logout2]
exten=>_X.,1,Dial(SIP/${EXTEN}@gate,,U(pretech,answer2,${ORIGINATE_ACTIONID}))


[pretech]
exten=s,1,NoOp(pretech)
exten=s,n,Verbose(${CHANNEL(name)})
exten=s,n,UserEvent(${ARG1},actionid:${ARG2})
exten=s,n,Return()



