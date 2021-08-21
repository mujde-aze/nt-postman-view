export class PostageStatus {
    static NEEDS_NT = "needs_nt";
    static NT_SENT = "nt_sent";
    static NT_RECEIVED = "nt_received";

    static getDisplayName(status){
        switch (status) {
            case PostageStatus.NEEDS_NT:
                return "Needs NT";
            case PostageStatus.NT_SENT:
                return "NT Sent";
            case PostageStatus.NT_RECEIVED:
                return "NT Received";
            default:
                return "Not Recognized";
        }
    }

    static getTransitionState(currentStatus) {
        switch (currentStatus) {
            case PostageStatus.NEEDS_NT:
                return PostageStatus.NT_SENT;
            case PostageStatus.NT_SENT:
                return PostageStatus.NT_RECEIVED;
            default:
                throw new Error("Unrecognized status.");
        }
    }
}
