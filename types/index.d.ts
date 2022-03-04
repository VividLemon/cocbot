declare namespace cocbot {
    export interface ClanDetails {
        clanTag: string,
        memberRoleId: string,
        elderRoleId: string,
        coRoleId: string
    }

}

declare module 'cocbot' {
    export = cocbot
}
