from requests.auth import AuthBase


class APSTokenAuth(AuthBase):
    '''
    Need to consider that APS Token has a very limited time validity and hence
    the client using this type auth should not be reused.
    '''

    def __init__(
        self,
        aps_token: str,
        aps_identity: str,
    ):
        self.aps_token = aps_token
        self.aps_identity = aps_identity

    def __call__(self, r):
        r.headers['aps-token'] = self.aps_token
        r.headers['aps-identity-id'] = self.aps_identity

        return r
