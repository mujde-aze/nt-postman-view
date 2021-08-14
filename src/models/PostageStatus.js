export class PostageStatus {
    static NEEDS_NT = "needs_nt"
    static NT_SENT = "nt_sent"

    static getDisplayName(status){
        switch (status) {
            case PostageStatus.NEEDS_NT:
                return "Needs NT";
            case PostageStatus.NT_SENT:
                return "NT Sent";
            default:
                return "Not Recognized";
        }
    }
}
