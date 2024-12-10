export class Branch {
    brID: number;
    branchName: string;
}

export class Usercontext {
    currentBranch: number;
    permittedBranches: Branch[];
    permissions: string[];
    currentBranchDisplayName: string
}
